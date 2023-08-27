import { ReactElement, useEffect } from 'react';
import useVideos from '../../hooks/useVideos';
import { useLayoutProvider } from '../../providers/LayoutProvider/LayoutProvider';

import styles from './HomePage.module.css';
import pages from '../../common/styles/pages.module.css';

import Video from '../../components/Video/Video';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorState from '../../components/ErrorState/ErrorState';
import { cl } from '../../utils/classnames.util';

const HomePage = (): ReactElement => {
	const { setTitle } = useLayoutProvider();
	const { videos, isLoading, hasError } = useVideos({});

	useEffect(() => {
		setTitle('Home');
	}, [setTitle]);

	return (
		<main className={cl(pages.topWrapper, pages.wrapper)}>
			<div className={styles.videoContainer}>
				{isLoading && <LoadingSpinner size={'large'} />}
				{hasError && <ErrorState size={'large'} />}
				{videos && !isLoading && !hasError && videos.map((video) => <Video key={`video.${video.id}`} video={video} />)}
			</div>
		</main>
	);
};

export default HomePage;
