import { ReactElement, useEffect, useState } from 'react';
import { imageFetch } from '../../services/image';
import { User } from '../../types/user.type';
import { cl } from '../../utils/classnames.util';
import styles from './ProfileImage.module.css';

type Props = {
	user: User;
	className?: string;
};

const ProfileImage = ({ user, className }: Props): ReactElement => {
	const [profile, setProfile] = useState<string>();

	useEffect(() => {
		const fetchProfile = async (): Promise<void> => {
			const { data } = await imageFetch(`/user/${user.id}/profile-image`);
			setProfile(data);
		};
		fetchProfile();
	}, [user]);

	return <img src={profile} alt={' '} className={cl(className, styles.image)} />;
};

export default ProfileImage;
