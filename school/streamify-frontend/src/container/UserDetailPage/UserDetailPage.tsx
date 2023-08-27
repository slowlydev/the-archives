import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import pages from '../../common/styles/pages.module.css';
import ErrorState from '../../components/ErrorState/ErrorState';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import Video from '../../components/Video/Video';
import useUser from '../../hooks/useUser';
import { sumDislikes, sumLikes } from '../../utils/video.util';
import styles from './UserDetailPage.module.css';

const UserDetailPage = (): ReactElement | null => {
	const { id } = useParams();
	const { user, videos, isLoading, hasError } = useUser({ id });

	return (
		<main className={pages.topWrapper}>
			{isLoading && <LoadingSpinner size={'large'} />}
			{hasError && <ErrorState size={'large'} />}
			{user && videos && !isLoading && !hasError && (
				<>
					<section className={styles.profileSection}>
						<div className={pages.wrapper}>
							<div className={styles.profileInfo}>
								<ProfileImage user={user} className={styles.profile} />
								<div>
									<h1>{user.username}</h1>
									<p>{`All likes: ${sumLikes(videos)}`}</p>
									<p>{`All dislikes: ${sumDislikes(videos)}`}</p>
								</div>
							</div>
						</div>
					</section>
					<div className={pages.wrapper}>
						<div className={styles.videoWrapper}>
							{videos.map((video) => (
								<Video key={`user.video.${video.id}`} video={video} />
							))}
						</div>
					</div>
				</>
			)}
		</main>
	);
};

export default UserDetailPage;
