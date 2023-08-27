import { Formik } from 'formik';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { useAuth } from '../../providers/AuthProvider/AuthProvider';
import { useNotifications } from '../../providers/NotificationProvider/NotificationProvider';
import { handleSigninRedirect } from '../../utils/signin.util';
import styles from './SigninPage.module.css';

type InitialValues = {
	username: string;
	password: string;
};

const SigninPage = (): ReactElement => {
	const { t } = useTranslation();
	const { signin } = useAuth();
	const { addSuccess, addFailure } = useNotifications();

	const navigate = useNavigate();

	const signinUser = async (values: InitialValues): Promise<void> => {
		try {
			await signin(values.username, values.password);
			addSuccess(t('notifications.signin.success'));
			navigate(handleSigninRedirect(sessionStorage.getItem('signin_route')));
			sessionStorage.removeItem('signin_route');
		} catch (err) {
			addFailure(t('notifications.signin.failure'));
			console.error(err);
		}
	};

	const initialValues: InitialValues = {
		username: '',
		password: '',
	};

	const validationSchema = Yup.object().shape({
		username: Yup.string()
			.required(t('form-validation.required'))
			.min(4, t('form-validation.too-short'))
			.max(32, t('form-validation.too-long')),
		password: Yup.string()
			.required(t('form-validation.required'))
			.min(4, t('form-validation.too-short'))
			.max(64, t('form-validation.too-long')),
	});

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={signinUser}>
					{({
						values,
						errors,
						touched,
						isValid,
						submitCount,
						isSubmitting,
						handleSubmit,
						setFieldValue,
						setFieldTouched,
					}) => {
						return (
							<form className={styles.form} onSubmit={handleSubmit}>
								<h2 className={styles.title}>{t('pages.signin.title')}</h2>
								<div className={styles.field}>
									<label htmlFor={'username'} className={styles.label}>
										{t('common.username')}
									</label>
									<Input
										id={'username'}
										type={'text'}
										value={values.username}
										placeholder={t('common.username').toLowerCase()}
										autoFocus={true}
										onChange={(v) => setFieldValue('username', v.target.value)}
										onBlur={() => setFieldTouched('username', true)}
									/>
									{touched.username && !!errors.username && <div className={styles.validation}>{errors.username}</div>}
								</div>
								<div className={styles.field}>
									<label htmlFor={'password'} className={styles.label}>
										{t('common.password')}
									</label>
									<Input
										id={'password'}
										type={'password'}
										value={values.password}
										placeholder={t('common.password').toLowerCase()}
										onChange={(v) => setFieldValue('password', v.target.value)}
										onBlur={() => setFieldTouched('password', true)}
									/>
									{touched.password && !!errors.password && <div className={styles.validation}>{errors.password}</div>}
								</div>
								<div className={styles.button}>
									<Button
										type={'submit'}
										text={t('pages.signin.button')}
										color={'blue'}
										loading={isSubmitting}
										disabled={!isValid && (submitCount > 0 || isSubmitting)}
									/>
								</div>
								<div className={styles.question}>
									<div className={styles.text}>{t('pages.signin.question')}</div>
									<Link to={'/auth/signup'} className={styles.link}>
										{t('pages.signin.link')}
									</Link>
								</div>
							</form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default SigninPage;
