import { ReactElement } from 'react';

type Props = {
	size: 'small' | 'large';
};

const ErrorState = ({ size }: Props): ReactElement | null => {
	if (size === 'small') {
		return <p>Error :(</p>;
	}

	if (size === 'large') {
		return <h1>Error :(</h1>;
	}

	return null;
};

export default ErrorState;
