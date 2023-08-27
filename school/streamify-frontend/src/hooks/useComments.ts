import { useCallback, useEffect, useState } from 'react';
import { getComments } from '../services/commentService';
import { stream } from '../services/stream';
import { Comment } from '../types/comment.type';
import { Event } from '../types/event.type';
import { Video } from '../types/video.type';

type Props = {
	video?: Video;
};

type ReturnType = {
	comments: Comment[] | undefined | null;
	isLoading: boolean;
	hasError: boolean;
	reloadComments: (silent?: boolean) => Promise<void>;
};

const useComments = ({ video }: Props): ReturnType => {
	const [comments, setComments] = useState<Comment[] | undefined | null>();
	const [hasError, setHasError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchComments = useCallback(
		async (controller?: AbortController, silent?: boolean) => {
			if (video?.id) {
				try {
					!silent && setIsLoading(true);
					const { data } = await getComments(video.id, controller);
					setComments(data ?? null);
					!silent && setIsLoading(false);
					setHasError(false);
				} catch (err) {
					if (!controller?.signal.aborted) {
						setIsLoading(false);
						setHasError(true);
					}
				}
			}
		},
		[video?.id],
	);

	const reloadComments = useCallback(
		async (silent?: boolean): Promise<void> => {
			await fetchComments(undefined, silent);
		},
		[fetchComments],
	);

	useEffect(() => {
		const controller = new AbortController();
		fetchComments(controller);
		const event = stream(`/video/${video?.id}/comment/sse`);
		event.onmessage = (event) => {
			const data: Event<unknown> = JSON.parse(event.data);
			data.event === 'heartbeat' ? void 0 : reloadComments(true);
		};
		return () => {
			event.close();
			controller.abort();
			setComments(undefined);
		};
	}, [fetchComments, reloadComments, video?.id]);

	return { comments, isLoading, hasError, reloadComments };
};

export default useComments;
