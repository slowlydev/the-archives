import { useCallback, useEffect, useState } from 'react';
import { getVideos } from '../services/videoService';
import { Video, VideoFilters } from '../types/video.type';

type Props = {
	filters?: VideoFilters;
};

type ReturnType = {
	videos: Video[] | undefined | null;
	isLoading: boolean;
	hasError: boolean;
	reloadVideos: (silent?: boolean) => Promise<void>;
};

const useVideos = ({ filters }: Props): ReturnType => {
	const [videos, setVideos] = useState<Video[] | undefined | null>();
	const [hasError, setHasError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchVideos = useCallback(
		async (controller?: AbortController, silent?: boolean) => {
			try {
				!silent && setIsLoading(true);
				const { data } = await getVideos(filters, controller);
				setVideos(data ?? null);
				!silent && setIsLoading(false);
				setHasError(false);
			} catch (err) {
				if (!controller?.signal.aborted) {
					setIsLoading(false);
					setHasError(true);
				}
			}
		},
		[filters],
	);

	const reloadVideos = useCallback(
		async (silent?: boolean): Promise<void> => {
			await fetchVideos(undefined, silent);
		},
		[fetchVideos],
	);

	useEffect(() => {
		const controller = new AbortController();
		fetchVideos(controller);
		return () => {
			controller.abort();
			setVideos(undefined);
		};
	}, [fetchVideos, reloadVideos]);

	return { videos, isLoading, hasError, reloadVideos };
};

export default useVideos;
