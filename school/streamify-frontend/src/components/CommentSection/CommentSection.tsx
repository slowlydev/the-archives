import { Formik } from 'formik';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import useComments from '../../hooks/useComments';
import { useAuth } from '../../providers/AuthProvider/AuthProvider';
import { useNotifications } from '../../providers/NotificationProvider/NotificationProvider';
import { postComment } from '../../services/commentService';
import { Video } from '../../types/video.type';
import Button from '../Button/Button';
import Comment from '../Comment/Comment';
import ErrorState from '../ErrorState/ErrorState';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ProfileImage from '../ProfileImage/ProfileImage';
import Textarea from '../Textarea/Textarea';
import styles from './CommentSection.module.css';

type InitialValues = {
	content: string;
};

type Props = {
	video: Video;
};

const CommentSection = ({ video }: Props): ReactElement => {
	const { t } = useTranslation();
	const { user } = useAuth();
	const { addSuccess, addFailure } = useNotifications();
	const { comments, isLoading, hasError } = useComments({ video });

	const createComment = async (values: InitialValues): Promise<void> => {
		try {
			await postComment(video.id, values);
			addSuccess(t('notifications.comment.success'));
			values.content = '';
		} catch {
			addFailure(t('notifications.comment.failure'));
		}
	};

	const initialValues: InitialValues = {
		content: '',
	};

	const validationSchema = Yup.object().shape({
		content: Yup.string()
			.required(t('form-validation.required'))
			.min(8, t('form-validation.too-short'))
			.max(512, t('form-validation.too-long')),
	});

	return (
		<section>
			{isLoading && <LoadingSpinner size={'large'} />}
			{hasError && <ErrorState size={'large'} />}
			{user && (
				<div className={styles.newComment}>
					<ProfileImage user={user} />
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={createComment}
						enableReinitialize={true}
					>
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
								<form className={styles.newCommentContent} onSubmit={handleSubmit}>
									<Textarea
										value={values.content}
										onChange={(v) => setFieldValue('content', v.target.value)}
										onBlur={() => setFieldTouched('content', true)}
										placeholder={'Type here to post a new comment'}
									/>
									{values.content.length > 7 && touched.content && !!errors.content && (
										<div className={styles.validation}>{errors.content}</div>
									)}
									{values.content.length > 7 && (
										<Button
											type={'submit'}
											text="Post"
											color="blue"
											loading={isSubmitting}
											disabled={!isValid && (submitCount > 0 || isSubmitting)}
										/>
									)}
								</form>
							);
						}}
					</Formik>
				</div>
			)}
			<div className={styles.commentsContainer}>
				{!isLoading &&
					!hasError &&
					comments &&
					comments.map((comment) => <Comment key={`comment.${comment.id}`} comment={comment} />)}
			</div>
		</section>
	);
};

export default CommentSection;
