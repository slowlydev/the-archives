import { config } from '../common/config/config';
import i18next from '../i18n';
import { FetchError, FetchOptions, FetchResponse, Headers, JwtToken, Method } from '../types/fetch.type';
import { buildUrl } from '../utils/url.util';

const parseJwt = (token: string): JwtToken => {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join(''),
	);

	return JSON.parse(jsonPayload);
};

export const getToken = (): string | null => {
	const token = localStorage.getItem('access_token');
	if (!token) {
		return null;
	}

	const payload = parseJwt(token);
	if (payload.exp < Math.floor(Date.now() / 1000)) {
		return null;
	}

	return token;
};

const getDefaultHeaders = (token: string | null): Headers => {
	return {
		Accept: 'application/json',
		'Content-Type': 'application/json;charset=UTF-8',
		'Accept-Language': i18next.language,
		Authorization: token ? `Bearer ${token}` : '',
	};
};

export const validateStatus = (status: number): boolean => {
	return status >= 200 && status < 300;
};

const parseData = async (response: Response): Promise<unknown> => {
	if (!validateStatus(response.status)) {
		const error: FetchError = {
			reason: `request failed with status ${response.status}`,
			status: response.status,
			message: response.statusText,
		};
		throw error;
	}
	if (response.status === 204 || response.status === 304) {
		return void 0;
	}
	try {
		const data = await response.json();
		return data;
	} catch {
		return void 0;
	}
};

export const fetch = async <T>(
	method: Method,
	endpoint: string,
	body?: unknown | null,
	options?: FetchOptions,
): Promise<FetchResponse<T>> => {
	const url = buildUrl(endpoint, options?.params);
	const token = getToken();

	const defaultHeaders = getDefaultHeaders(token);
	const otherHeaders = options?.headers ?? {};
	const combinedHeaders = { ...defaultHeaders, ...otherHeaders };

	if (config.stage === 'localhost') {
		await new Promise((resolve) => setTimeout(resolve, 500));
	}

	const response = await window.fetch(url, {
		method: method.toUpperCase(),
		body: body ? JSON.stringify(body) : null,
		headers: combinedHeaders,
		signal: options?.signal,
	});
	const data = await parseData(response);

	const status = response.status;
	const statusText = response.statusText;

	return { status, statusText, data: data as T };
};
