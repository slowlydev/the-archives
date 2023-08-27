import { config } from '../common/config/config';
import { buildParams, buildUrl } from './url.util';

test('test build url function', () => {
	expect(buildUrl).toBeDefined();
	expect(buildUrl).toBeInstanceOf(Function);

	expect(buildUrl('/hello-world')).toEqual(`${config.backendUrl}/hello-world`);
});

test('test build params function', () => {
	expect(buildParams).toBeDefined();
	expect(buildParams).toBeInstanceOf(Function);

	expect(buildParams({ hello: 'world' })).toEqual(`?hello=world`);
});

test('test build url with params', () => {
	expect(buildUrl('/hello-world', { hello: 'world' })).toEqual(`${config.backendUrl}/hello-world?hello=world`);
	expect(buildUrl('/hello-world', { hello: 'world', valid: true })).toEqual(
		`${config.backendUrl}/hello-world?hello=world&valid=true`,
	);
});
