import { useCallback, useEffect, useState } from 'react';
import { stream } from '../services/stream';
import { getVideo } from '../services/videoService';
import { Event } from '../types/event.type';
import { Video } from '../types/video.type';

type Props = {
	id?: Video['id'];
};

type ReturnType = {
	video: Video | undefined | null;
	isLoading: boolean;
	hasError: boolean;
	reloadVideo: (silent?: boolean) => Promise<void>;
};

const useVideo = ({ id }: Props): ReturnType => {
	const [video, setVideo] = useState<Video | undefined | null>();
	const [hasError, setHasError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchVideo = useCallback(
		async (controller?: AbortController, silent?: boolean) => {
			if (id) {
				try {
					!silent && setIsLoading(true);
					const { data } = await getVideo(id);
					setVideo(data ?? null);
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
		[id],
	);

	const reloadVideo = useCallback(
		async (silent?: boolean): Promise<void> => {
			await fetchVideo(undefined, silent);
		},
		[fetchVideo],
	);

	useEffect(() => {
		const controller = new AbortController();
		fetchVideo(controller);
		const event = stream(`/video/${id}/sse`);
		event.onmessage = (event) => {
			const data: Event<unknown> = JSON.parse(event.data);
			data.event === 'heartbeat' ? void 0 : reloadVideo(true);
		};
		return () => {
			event.close();
			controller.abort();
			setVideo(undefined);
		};
	}, [fetchVideo, id, reloadVideo]);

	return { video, isLoading, hasError, reloadVideo };
};

export default useVideo;
