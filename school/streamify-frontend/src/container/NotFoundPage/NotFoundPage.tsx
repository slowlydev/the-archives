import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './NotFountPage.module.css';

const NotFoundPage = (): ReactElement => {
	const { t } = useTranslation();

	return (
		<div className={styles.wrapper}>
			<h1>{t('exceptions.not-found.title')}</h1>
			<p>{t('exceptions.not-found.message')}</p>
		</div>
	);
};

export default NotFoundPage;
