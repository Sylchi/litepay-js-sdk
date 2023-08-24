export default class LitepayClient {
    apiKey: string;
    debug: boolean;
    constructor({ apiKey, debug }: {
        apiKey?: string;
        debug?: boolean;
    });
    query({ query, variables }: {
        query: string;
        variables?: Record<string, unknown>;
    }): Promise<any>;
    getTokens(): Promise<any>;
}

//# sourceMappingURL=types.d.ts.map
