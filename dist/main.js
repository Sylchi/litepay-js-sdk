function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", function () { return $a196c1ed25598f0e$export$2e2bcd8739ae039; });
const $a196c1ed25598f0e$var$API_URL = "https://api.litepay.gg/api/graphql";
class $a196c1ed25598f0e$export$2e2bcd8739ae039 {
    constructor({ apiKey: apiKey, debug: debug }){
        this.apiKey = "";
        this.debug = false;
        if (apiKey) this.apiKey = apiKey;
        if (debug) this.debug = true;
    }
    async query({ query: query, variables: variables }) {
        const result = await fetch($a196c1ed25598f0e$var$API_URL, {
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


//# sourceMappingURL=main.js.map
