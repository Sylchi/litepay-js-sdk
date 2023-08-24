# Litepay.gg javascript sdk

This is a wrapper over Litepay.gg api. Typedoc available at https://litepay-gg.github.io/litepay-js-sdk/

## Installation

    npm install @litepay/litepay-js-sdk


## Usage
```TypeScript
    import LitepayClient from '@litepay/litepay-js-sdk';

    const lpClient = new LitepayClient({});

    lpClient.getTokens().then(console.log);
```

## Methods

| name | description |
| --- | --- |
| getTokens | Get list of tokens available to send and receive |
| createPaymentLink | Input what you want to receive and get back a link where customer can choose their payment method and pay using their preferred method |
| getRate | Allows you to get the rate customer has to pay to fulfill payment link |
| createOrder | Creates order using payment link and customer selected token |
| subscribeOrderUpdates | Allows you to listen to order updates in real-time |
| subscribePaymentLink | Allows you to get info on orders that are generated with payment link |