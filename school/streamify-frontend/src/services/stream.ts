import { EventSourcePolyfill } from 'event-source-polyfill';
import i18next from '../i18n';
import { Headers } from '../types/fetch.type';
import { buildUrl } from '../utils/url.util';
import { getToken } from './fetch';

const getHeaders = (token: string | null): Headers => {
	return {
		Accept: 'text/event-stream',
		'Content-Type': 'text/event-stream;charset=UTF-8',
		'Accept-Language': i18next.language,
		Authorization: token ? `Bearer ${token}` : '',
	};
};

const stream = (url: string): EventSourcePolyfill => {
	url = buildUrl(url);

	const token = getToken();
	const headers = getHeaders(token);

	return new EventSourcePolyfill(url, { headers });
};

export { stream };
