import { FetchResponse } from '../types/fetch.type';
import { Video, VideoFilters } from '../types/video.type';
import { fetch } from './fetch';

export const getVideos = (filters?: VideoFilters, controller?: AbortController): Promise<FetchResponse<Video[]>> => {
	return fetch<Video[]>('get', '/video', null, { params: filters, signal: controller?.signal });
};

export const getVideo = (id: Video['id']): Promise<FetchResponse<Video>> => {
	return fetch<Video>('get', `/video/${id}`);
};

export const patchVideoLike = (id: Video['id']): Promise<FetchResponse<void>> => {
	return fetch<void>('patch', `/video/${id}/like`);
};

export const patchVideoDislike = (id: Video['id']): Promise<FetchResponse<void>> => {
	return fetch<void>('patch', `/video/${id}/dislike`);
};
