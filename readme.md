# Litepay.gg javascript sdk

This is a wrapper over Litepay.gg api.

## Installation

    npm install @litepay/litepay-js-sdk


## Usage

    import LitepayClient from '@litepay/litepay-js-sdk'
    const lpClient = new LitepayClient({});
    lpClient.getTokens().then(console.log);