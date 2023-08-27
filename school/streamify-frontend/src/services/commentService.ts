import { Comment, CreateComment } from '../types/comment.type';
import { FetchResponse } from '../types/fetch.type';
import { Video } from '../types/video.type';
import { fetch } from './fetch';

export const getComments = (id: Video['id'], controller?: AbortController): Promise<FetchResponse<Comment[]>> => {
	return fetch<Comment[]>('get', `/video/${id}/comment`, null, { signal: controller?.signal });
};

export const postComment = (id: Video['id'], comment: CreateComment): Promise<FetchResponse<Comment>> => {
	return fetch<Comment>('post', `/video/${id}/comment`, comment);
};
