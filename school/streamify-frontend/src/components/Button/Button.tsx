import { ReactElement } from 'react';
import { ButtonColor, ButtonType } from '../../types/button.type';
import { cl } from '../../utils/classnames.util';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import styles from './Button.module.css';

type Props = {
	type?: ButtonType;
	text: string;
	color: ButtonColor;
	disabled?: boolean;
	loading?: boolean;
	className?: string;

	onClick?: () => void;
};

const Button = ({ type, text, color, disabled, loading, onClick, className }: Props): ReactElement => {
	const classes = cl(
		className,
		styles.button,
		color === 'blue' && styles.blue,
		color === 'grey' && styles.grey,
		disabled && styles.disabled,
		loading && styles.loading,
		color === 'blue' && loading && styles.loadingBlue,
		color === 'grey' && loading && styles.loadingGrey,
	);

	return (
		<button type={type} disabled={disabled || loading} className={classes} onClick={onClick}>
			{!loading && text}
			{loading && <LoadingSpinner size={'small'} />}
		</button>
	);
};

export default Button;
