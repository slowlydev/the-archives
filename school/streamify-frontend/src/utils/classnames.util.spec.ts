import { cl } from './classnames.util';

test('test cl classnames', () => {
	expect(cl).toBeDefined();
	expect(cl).toBeInstanceOf(Function);

	expect(cl('hello', 'world', false, undefined)).toEqual('hello world');
});
