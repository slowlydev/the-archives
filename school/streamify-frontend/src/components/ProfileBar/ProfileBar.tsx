import { ReactElement } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoutIcon from '../../assets/icons/logout.svg';
import { useAuth } from '../../providers/AuthProvider/AuthProvider';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ProfileImage from '../ProfileImage/ProfileImage';
import styles from './ProfileBar.module.css';

const ProfileBar = (): ReactElement | null => {
	const { user, clearUser } = useAuth();

	const location = useLocation();
	const navigate = useNavigate();

	const handleClearUser = (): void => {
		clearUser();
		navigate('/auth/signin');
	};

	if (location.pathname.includes('auth')) return null;

	return (
		<header>
			<div>
				<Link className={styles.title} to={'/'}>
					Streamify
				</Link>

				{user ? (
					<div className={styles.profile} onClick={() => navigate(`/user/${user.id}`)}>
						<ProfileImage user={user} />
						<div>
							<p className={styles.username}>{user.username}</p>
						</div>
					</div>
				) : (
					<LoadingSpinner size="small" />
				)}

				<img src={logoutIcon} alt="logout" className={styles.logout} onClick={handleClearUser} />
			</div>
		</header>
	);
};

export default ProfileBar;
