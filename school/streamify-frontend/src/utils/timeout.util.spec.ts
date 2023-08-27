import { timeout } from './timeout.util';

test('test timeout function', async () => {
	expect(timeout).toBeDefined();
	expect(timeout).toBeInstanceOf(Function);

	expect(await timeout(200)).toBeUndefined();
});
