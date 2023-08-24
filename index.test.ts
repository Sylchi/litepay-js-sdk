import LitepayClient from "./index";

const client = new LitepayClient({ apiKey: 'Giecu9aixoo4ood5uapeix2thohhu9hoh7lechuch7ohleiveedieyothieshieb', debug: true });

test('Can get tokens', async () => {
  const tokens = await client.getTokens();
  expect(Array.isArray(tokens)).toBe(true);
  expect(tokens.length).toBeGreaterThan(0);
})