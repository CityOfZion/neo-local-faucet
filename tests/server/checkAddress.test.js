import checkAddress from './../../src/server/checkAddress';

it('Goes false on unknown address', async () => {
  const value = await checkAddress("notaneoaddress")
  expect(value).toBe(false);
});
