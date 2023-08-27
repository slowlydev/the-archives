import { Formik } from 'formik';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { useAuth } from '../../providers/AuthProvider/AuthProvider';
import { useNotifications } from '../../providers/NotificationProvider/NotificationProvider';
import styles from './SignupPage.module.css';

type InitialValues = {
	username: string;
	password: string;
	confirmPassword: string;
};

const SignupPage = (): ReactElement => {
	const { t } = useTranslation();
	const { signup } = useAuth();
	const { addSuccess, addFailure } = useNotifications();

	const navigate = useNavigate();

	const signupUser = async (values: InitialValues): Promise<void> => {
		if (values.password !== values.confirmPassword) {
			addFailure(t('notifications.signup.no-match'));
			return;
		}
		try {
			await signup(values.username, values.password);
			addSuccess(t('notifications.signup.success'));
			navigate('/');
		} catch (err) {
			addFailure(t('notifications.signup.failure'));
			console.error(err);
		}
	};

	const initialValues: InitialValues = {
		username: '',
		password: '',
		confirmPassword: '',
	};

	const validationSchema = Yup.object().shape({
		username: Yup.string()
			.required(t('form-validation.required'))
			.min(4, t('form-validation.too-short'))
			.max(32, t('form-validation.too-long'))
			.matches(/^[a-zA-Z0-9-]+$/, t('form-validation.username')),
		password: Yup.string()
			.required(t('form-validation.required'))
			.min(4, t('form-validation.too-short'))
			.max(64, t('form-validation.too-long')),
		confirmPassword: Yup.string()
			.required(t('form-validation.required'))
			.min(4, t('form-validation.too-short'))
			.max(64, t('form-validation.too-long')),
	});

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={signupUser}>
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
								<h2 className={styles.title}>{t('pages.signup.title')}</h2>
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
								<div className={styles.field}>
									<label htmlFor={'confirm-password'} className={styles.label}>
										{t('pages.signup.confirm-password')}
									</label>
									<Input
										id={'confirm-password'}
										type={'password'}
										value={values.confirmPassword}
										placeholder={t('pages.signup.confirm-password').toLowerCase()}
										onChange={(v) => setFieldValue('confirmPassword', v.target.value)}
										onBlur={() => setFieldTouched('confirmPassword', true)}
									/>
									{touched.confirmPassword && !!errors.confirmPassword && (
										<div className={styles.validation}>{errors.confirmPassword}</div>
									)}
								</div>
								<div className={styles.button}>
									<Button
										type={'submit'}
										text={t('pages.signup.button')}
										color={'blue'}
										loading={isSubmitting}
										disabled={!isValid && (submitCount > 0 || isSubmitting)}
									/>
								</div>
								<div className={styles.question}>
									<div className={styles.text}>{t('pages.signup.question')}</div>
									<Link to={'/auth/signin'} className={styles.link}>
										{t('pages.signup.link')}
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

export default SignupPage;
