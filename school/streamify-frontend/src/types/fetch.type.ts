export type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type Headers = {
	[headerName: string]: string;
};

export type Params = Record<string, string[] | string | number | boolean | undefined | null>;

export type FetchOptions = {
	headers?: Headers | null;
	params?: Params;
	signal?: AbortSignal | null;
};

export type FetchResponse<T> = {
	status: number;
	statusText: string;
	data: T;
};

export type FetchError = {
	reason?: string;
	status?: number;
	message?: string;
};

export type JwtToken = {
	username: string;
	password: string;
	iat: number;
	exp: number;
};
