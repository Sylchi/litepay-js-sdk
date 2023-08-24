import LitepayClient from "./index";

const client = new LitepayClient({ apiKey: 'Giecu9aixoo4ood5uapeix2thohhu9hoh7lechuch7ohleiveedieyothieshieb', debug: true });

let tokenCache: any[];

test('Can get tokens', async () => {
  const tokens = await client.getTokens();
  tokenCache = tokens;
  expect(Array.isArray(tokens)).toBe(true);
  expect(tokens.length).toBeGreaterThan(0);
})

test('Can create payment link', async () => {
  const createResult = await client.createPaymentLink({
    amount: '10.00',
    amountCurrency: 'USD',
    title: 'Test payment link',
    description: 'Test payment description',
    toCcy: 'ETH',
    receiveAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    metadata: {
      clientId: '1234'
    }
  });
  expect(createResult).toBeDefined();
  expect(createResult.friendlyId).toBeDefined();
  expect(createResult.amount).toBe("10.0000");
  expect(createResult.amountCurrency).toBe('USD');
  expect(createResult.title).toBe('Test payment link');
  expect(createResult.description).toBe('Test payment description');
  expect(createResult.toCcy).toBe('ETH');
  expect(createResult.receiveAddress).toBe('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
  expect(createResult.metadata?.clientId).toBe('1234');
})