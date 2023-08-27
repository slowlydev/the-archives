import { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from 'react';

const WindowSizeContext = createContext<Values>({
	windowWidth: window.innerWidth,
	windowHeight: window.innerHeight,
});

type Props = {
	children: ReactNode;
};

type Values = {
	windowWidth: number;
	windowHeight: number;
};

const useWindowSize = (): Values => {
	return useContext(WindowSizeContext);
};

const WindowSizeProvider = ({ children }: Props): ReactElement => {
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
	const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

	const handleResize = (): void => {
		setWindowWidth(window.innerWidth);
		setWindowHeight(window.innerHeight);
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize, false);
		return () => window.removeEventListener('resize', handleResize, false);
	}, []);

	const value: Values = { windowWidth, windowHeight };

	return <WindowSizeContext.Provider value={value}>{children}</WindowSizeContext.Provider>;
};

export { WindowSizeProvider, useWindowSize };
