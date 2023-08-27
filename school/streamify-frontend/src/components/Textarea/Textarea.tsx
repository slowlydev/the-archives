import { ChangeEvent, ReactElement } from 'react';
import styles from './Textarea.module.css';

type Props = {
	id?: string;
	value: string;
	placeholder?: string;
	autoFocus?: boolean;
	onChange: (v: ChangeEvent<HTMLTextAreaElement>) => void;
	onBlur?: () => void;
};

const Textarea = ({ id, value, placeholder, autoFocus, onChange, onBlur }: Props): ReactElement => {
	return (
		<textarea
			id={id}
			value={value}
			placeholder={placeholder}
			autoFocus={autoFocus}
			onChange={onChange}
			onBlur={onBlur}
			className={styles.textarea}
		/>
	);
};

export default Textarea;
