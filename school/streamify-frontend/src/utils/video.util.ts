import { Video } from '../types/video.type';

export const sumLikes = (videos: Video[]): number => {
	return videos.reduce((accumulator, video) => accumulator + video.likes, 0);
};

export const sumDislikes = (videos: Video[]): number => {
	return videos.reduce((accumulator, video) => accumulator + video.dislikes, 0);
};
