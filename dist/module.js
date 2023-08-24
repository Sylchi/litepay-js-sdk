const $643fcf18b2d2e76f$var$API_URL = "https://api.litepay.gg/api/graphql";
class $643fcf18b2d2e76f$export$2e2bcd8739ae039 {
    constructor({ apiKey: apiKey, debug: debug }){
        this.apiKey = "";
        this.debug = false;
        if (apiKey) this.apiKey = apiKey;
        if (debug) this.debug = true;
    }
    async query({ query: query, variables: variables }) {
        const result = await fetch($643fcf18b2d2e76f$var$API_URL, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "x-api-key": this.apiKey
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        }).then((res)=>res.json());
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
            if (this.debug) console.error(err);
            throw new Error("Litepay: Couldn't fetch tokens");
        }
    }
}


export {$643fcf18b2d2e76f$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=module.js.map
