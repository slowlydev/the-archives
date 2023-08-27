import { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { config } from '../../common/config/config';
import pages from '../../common/styles/pages.module.css';
import CommentSection from '../../components/CommentSection/CommentSection';
import ErrorState from '../../components/ErrorState/ErrorState';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import useVideo from '../../hooks/useVideo';
import useVideos from '../../hooks/useVideos';
import { fetch } from '../../services/fetch';

import { cl } from '../../utils/classnames.util';

import styles from './VideoDetailPage.module.css';

import thumbsDown from '../../assets/icons/thumbs-down.svg';
import thumbsUp from '../../assets/icons/thumbs-up.svg';
import Video from '../../components/Video/Video';
import Button from '../../components/Button/Button';
import { useNotifications } from '../../providers/NotificationProvider/NotificationProvider';

const VideoDetailPage = (): ReactElement => {
	const { id } = useParams();
	const { addSuccess, addFailure } = useNotifications();
	const { video, isLoading, hasError } = useVideo({ id });
	const { videos, isLoading: isLoadingVideos, hasError: hasErrorVdieos } = useVideos({});

	const navigate = useNavigate();

	const [videosToShow, setVideosToShow] = useState(5);

	useEffect(() => {
		if (!id) {
			navigate('*');
			return;
		}
	}, [id, navigate]);

	const handleInteraction = async (action: 'like' | 'dislike'): Promise<void> => {
		try {
			await fetch('patch', `${config.backendUrl}/video/${id}/${action}`);
			addSuccess(`Video successfully ${action}d`);
		} catch (_) {
			addFailure(`Failed to ${action} video`);
		}
	};

	const showMoreVideos = (): void => {
		setVideosToShow((prevCount) => prevCount + 5);
	};

	return (
		<main className={cl(styles.main, pages.topWrapper, pages.wrapper)}>
			<section className={styles.mainVideo}>
				{isLoading && <LoadingSpinner size={'large'} />}
				{hasError && <ErrorState size={'large'} />}
				{video && (
					<>
						{/*eslint-disable-next-line jsx-a11y/media-has-caption*/}
						<video controls className={styles.video} src={`${config.backendUrl}/video/${id}/stream`} />

						<div className={styles.videoInfo}>
							<div className={styles.videoInfoContainer}>
								<h1>{video.title}</h1>
								<p>{video.description}</p>

								<div className={styles.videoMetrics}>
									<p>Views: {video.views}</p>
									<p>Likes: {video.likes}</p>
									<p>Dislikes: {video.dislikes}</p>
								</div>
							</div>

							<div className={styles.videoInteractionContainer}>
								<button
									className={video.liked ? styles.activeLike : undefined}
									onClick={() => handleInteraction('like')}
								>
									<img src={thumbsUp} alt=" " />
								</button>

								<button
									className={video.disliked ? styles.activeDislike : undefined}
									onClick={() => handleInteraction('dislike')}
								>
									<img src={thumbsDown} alt=" " />
								</button>
							</div>
						</div>

						<div className={styles.profileInfo}>
							<ProfileImage user={video.user} />
							<div>
								<p>{video.user.username}</p>
							</div>
						</div>

						<h2 className={styles.commentsTitle}>Comments</h2>
						<CommentSection video={video} />
					</>
				)}
			</section>

			<section className={styles.relatedVideos}>
				{isLoadingVideos && <LoadingSpinner size={'large'} />}
				{hasErrorVdieos && <ErrorState size={'large'} />}
				{videos && (
					<div className={styles.relatedVideosContainer}>
						{videos
							.filter((_, index) => index < videosToShow)
							.map((video) => (
								<Video key={video.id} video={video} />
							))}

						{videosToShow < videos.length && (
							<Button text="Show More" color="blue" className={styles.showMoreButton} onClick={showMoreVideos} />
						)}
					</div>
				)}
			</section>
		</main>
	);
};

export default VideoDetailPage;
