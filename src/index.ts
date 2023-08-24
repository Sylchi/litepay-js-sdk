const API_URL = 'https://api.litepay.gg/api/graphql';

import type { PaymentLinkCreateInput } from './types';

export default class LitepayClient {
  apiKey = "";
  debug = false;
  customHeaders: Function | undefined;

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
    const result = await fetch(API_URL, {
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

  async createPaymentLink(params: PaymentLinkCreateInput) {
    try {
      const result = await this.query({
        query: `
          mutation CreatePaymentLink($data: PaymentLinkCreateInput!) {
            createPaymentLink(data: $data) {
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

}