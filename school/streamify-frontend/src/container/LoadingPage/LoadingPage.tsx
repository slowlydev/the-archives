import { ReactElement } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import styles from './LoadingPage.module.css';

const LoadingPage = (): ReactElement => {
	return (
		<div className={styles.wrapper}>
			<LoadingSpinner size={'large'} />
		</div>
	);
};

export default LoadingPage;
