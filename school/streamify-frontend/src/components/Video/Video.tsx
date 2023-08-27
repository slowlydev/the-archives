import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageFetch } from '../../services/image';
import { Video as VideoType } from '../../types/video.type';
import { comparativeTime } from '../../utils/date.util';
import ProfileImage from '../ProfileImage/ProfileImage';
import styles from './Video.module.css';

type Props = {
	video: VideoType;
};

const Video = ({ video }: Props): ReactElement => {
	const [img, setImg] = useState<string>();

	const navigate = useNavigate();

	useEffect(() => {
		const fetchImage = async (): Promise<void> => {
			const { data } = await imageFetch(`/video/${video.id}/thumbnail`);
			setImg(data);
		};
		fetchImage();
	}, [video]);

	return (
		<div className={styles.video}>
			<img className={styles.thumbnail} src={img} alt={' '} onClick={() => navigate(`/video/${video.id}`)} />
			<div className={styles.videoInfo} onClick={() => navigate(`/user/${video.user.id}`)}>
				<ProfileImage user={video.user} />
				<div>
					<p className={styles.title}>{video.title}</p>
					<p className={styles.username}>{video.user.username}</p>
					<div className={styles.info}>
						<p>
							{video.views} Views - {video.likes} Likes - {comparativeTime(new Date(), new Date(video.createdAt))}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Video;
