import { useCallback, useEffect, useState } from 'react';
import { getUser, getVideosOfUser } from '../services/userService';
import { User } from '../types/user.type';
import { Video } from '../types/video.type';

type Props = {
	id?: User['id'];
};

type ReturnType = {
	user: User | undefined | null;
	videos: Video[] | undefined | null;
	isLoading: boolean;
	hasError: boolean;
	reloadUser: (silent?: boolean) => Promise<void>;
};

const useUser = ({ id }: Props): ReturnType => {
	const [user, setUser] = useState<User | undefined | null>();
	const [videos, setVideos] = useState<Video[] | undefined | null>();
	const [hasError, setHasError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchVideos = useCallback(
		async (controller?: AbortController, silent?: boolean) => {
			if (id) {
				try {
					!silent && setIsLoading(true);
					const { data } = await getUser(id, controller);
					setUser(data ?? null);
					const { data: videos } = await getVideosOfUser(id, controller);
					setVideos(videos);
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

	const reloadUser = useCallback(
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
			setUser(undefined);
		};
	}, [fetchVideos, reloadUser]);

	return { user, videos, isLoading, hasError, reloadUser };
};

export default useUser;
