const GRAPHQL_API_URL = 'https://api.litepay.gg/api/graphql';
const WEBSOCKET_URL = 'wss://api.litepay.gg';

import type { PaymentLinkCreateInput, PaymentLinkCreateOutput } from './types';
import type { Socket } from 'socket.io-client';
import io from 'socket.io-client';

class LitepayClient {
  apiKey = "";
  debug = false;
  customHeaders: Function | undefined;
  orderUpdateSubscriptions = new Map<string, Set<any>>;
  wsClient: Socket | undefined;

  constructor({ apiKey, debug, customHeaders }: { apiKey?: string, debug?: boolean, customHeaders?: Function | undefined }) {
    if(apiKey) this.apiKey = apiKey;
    if(debug) this.debug = true;
    if(customHeaders) this.customHeaders = customHeaders;
  }

  async query({ query, variables }: { query: string, variables?: Record<string, unknown>}) {
    const headers = {
      'content-type': 'application/json',
      'x-api-key': this.apiKey
    };
    if(this.customHeaders) {
      const toAdd = await this.customHeaders();
      Object.assign(headers, toAdd);
    }
    const result = await fetch(GRAPHQL_API_URL, {
      method: 'POST',
      cache: "no-store",
      headers, 
      body: JSON.stringify({ query, variables })
    }).then(res => res.json());
    return result;
  }
  
  async getTokens() {
    try {
      const result = await this.query({
        query: `
          query Tokens {
            tokens {
              code
              coin
              network
              priority
              name
              recv
              send
              tag
              color
            }
          }
        `
      });
      return result.data.tokens;
    } catch (err) {
      if(this.debug) console.error(err);
      throw new Error("Litepay: Couldn't fetch tokens");
    }
  }

  async createPaymentLink(params: PaymentLinkCreateInput): Promise<PaymentLinkCreateOutput> {
    try {
      const result = await this.query({
        query: `
          mutation CreatePaymentLink($data: PaymentLinkCreateInput!) {
            createPaymentLink(data: $data) {
              id: friendlyId
              friendlyId
              title
              description
              allowCustomPrice
              amount
              amountCurrency
              metadata
              toCcy
              receiveToken
              receiveNetwork
              receiveAddress
              createdAt
              formatToken
              formatAmount
              tokenInfo
            }
          }
        `, variables: {
          data: params
        }
      })
      return result.data.createPaymentLink;
    } catch (err) {
      if(this.debug) console.error(err);
      throw new Error("Litepay: Couldn't create payment link");
    }
  }
  /** Useful for showing customer the rate after they have selected their desired currency */
  async getRate({ paymentLinkId, fromCcy }: { paymentLinkId: string, fromCcy: string }): Promise<[any, Array<any>]> {
    const result = await this.query({ 
      query: `
        query($where: PaymentLinkWhereUniqueInput!, $fromCcy: String!) {
          paymentLink(where: $where) {
            id
            getRate(fromCcy: $fromCcy)
          } 
        }
      `, variables: {
        where: { [paymentLinkId.length === 8 ? 'friendlyId':'id']: paymentLinkId },
        fromCcy
      }
    })
    return [result.data.paymentLink.getRate, result.errors];
  }
  /** Returns order ID. */
  async createOrder({ paymentLinkId, fromCcy }: { paymentLinkId: string, fromCcy: string }): Promise<[string, Array<any>]> {
    const result = await this.query({ 
      query: `
        query($where: PaymentLinkWhereUniqueInput!, $fromCcy: String!) {
          paymentLink(where: $where) {
            id
            createOrder(fromCcy: $fromCcy)
          } 
        }
      `, variables: {
        where: { [paymentLinkId.length === 8 ? 'friendlyId':'id']: paymentLinkId },
        fromCcy
      }
    })
    return [result.data.paymentLink.createOrder, result.errors];
  }
  subscribeOrderUpdates({ orderId, callback }: { orderId: string, callback: (...args: any[]) => void }) {
    if(!this.wsClient) this.wsClient = io(WEBSOCKET_URL, {
      reconnectionDelayMax: 10000,
      withCredentials: true
    });
    this.wsClient.on("orderUpdate", callback);
    this.wsClient.emit("subscribeOrderUpdate", orderId);
  }
  subscribePaymentLink({ paymentLinkId, callback }: { paymentLinkId: string, callback: (...args: any[]) => void }) {
    if(!this.wsClient) this.wsClient = io(WEBSOCKET_URL, {
      reconnectionDelayMax: 10000,
      withCredentials: true
    });
    this.wsClient.on("orderCreated", callback);
    this.wsClient.emit("subscribePaymentLink", paymentLinkId);
  } 
}

export default LitepayClient;