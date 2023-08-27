import { config } from '../common/config/config';
import { Params } from '../types/fetch.type';

export const buildParams = (params?: Params): string => {
	if (params) {
		Object.keys(params).forEach((key) => (params[key] === undefined ? delete params[key] : {}));
		return `?${new URLSearchParams(params as Record<string, string>)}`;
	}
	return '';
};

export const buildUrl = (endpoint: string, params?: Params): string => {
	if (endpoint.startsWith('http')) {
		return `${endpoint}${buildParams(params)}`;
	}
	return `${config.backendUrl}${endpoint}${buildParams(params)}`;
};
