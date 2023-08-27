import { ReactElement } from 'react';
import { cl } from '../../utils/classnames.util';
import styles from './LoadingSpinner.module.css';

type Props = {
	size: 'small' | 'large';
};

const LoadingSpinner = ({ size }: Props): ReactElement | null => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={cl(styles.spinner, size === 'small' && styles.small, size === 'large' && styles.large)}></div>
			</div>
		</div>
	);
};

export default LoadingSpinner;
