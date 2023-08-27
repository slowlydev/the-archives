import { Signin, Signup } from '../types/auth.type';
import { FetchResponse } from '../types/fetch.type';
import { User } from '../types/user.type';
import { fetch } from './fetch';

export const fetchUser = (controller?: AbortController): Promise<FetchResponse<User>> => {
	return fetch<User>('get', '/auth/me', null, { signal: controller?.signal });
};

export const signupUser = (username: string, password: string): Promise<FetchResponse<Signup>> => {
	return fetch<Signup>('post', '/auth/signup', { username, password });
};

export const signinUser = (username: string, password: string): Promise<FetchResponse<Signin>> => {
	return fetch<Signin>('post', '/auth/signin', { username, password });
};
