type Config = {
	stage: 'localhost' | 'development' | 'production';
	backendUrl: string;
};

const validateConfig = (): Config => {
	if (!process.env.REACT_APP_PORT) {
		throw new Error('no port specified');
	}

	if (!process.env.REACT_APP_STAGE) {
		throw new Error('no stage specified');
	}

	if (!process.env.REACT_APP_BACKEND_URL) {
		throw new Error('no backend url specified');
	}

	if (!['localhost', 'development', 'production'].includes(process.env.REACT_APP_STAGE)) {
		throw new Error(`unknown stage ${process.env.REACT_APP_STAGE}`);
	}

	return {
		stage: process.env.REACT_APP_STAGE as Config['stage'],
		backendUrl: process.env.REACT_APP_BACKEND_URL,
	};
};

const config = validateConfig();

export { config };
