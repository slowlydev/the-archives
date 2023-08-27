import { Base } from './base.type';
import { User } from './user.type';

export type Video = Base & {
	title: string;
	description: string;
	views: number;
	likes: number;
	dislikes: number;
	liked: boolean;
	disliked: boolean;
	user: User;
};

export type VideoFilters = {
	title?: Video['title'];
	user?: User['id'];
	skip?: number;
	take?: number;
};
