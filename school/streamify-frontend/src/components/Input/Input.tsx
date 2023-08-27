import { ChangeEvent, ReactElement } from 'react';
import { InputType } from '../../types/input.type';
import styles from './Input.module.css';

type Props = {
	id?: string;
	type?: InputType;
	value: string;
	placeholder?: string;
	autoFocus?: boolean;
	onChange: (v: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: () => void;
};

const Input = ({ id, type, value, placeholder, autoFocus, onChange, onBlur }: Props): ReactElement => {
	return (
		<input
			id={id}
			type={type}
			value={value}
			placeholder={placeholder}
			autoFocus={autoFocus}
			onChange={onChange}
			onBlur={onBlur}
			className={styles.input}
		/>
	);
};

export default Input;
