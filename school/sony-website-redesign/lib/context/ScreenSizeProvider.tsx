import { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from "react";

const ScreenSizeContext = createContext<Values>({
	screenWidth: 0,
	screenHeight: 0,
	mobile: false,
});

type Props = {
	children: ReactNode;
};

type Values = {
	screenWidth: number;
	screenHeight: number;
	mobile: boolean;
};

const useScreenSize = (): Values => {
	return useContext(ScreenSizeContext);
};

const ScreenSizeProvider = ({ children }: Props): ReactElement => {
	const [screenWidth, setScreenWidth] = useState<number>(0);
	const [screenHeight, setScreenHeight] = useState<number>(0);
	const [mobile, setMobile] = useState<boolean>(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const handleResize = (): void => {
				setScreenWidth(window.innerWidth);
				setScreenHeight(window.innerHeight);
				setMobile(window.innerWidth < 700);
			};

			window.addEventListener("resize", handleResize, false);
			handleResize();

			return () => window.removeEventListener("resize", handleResize, false);
		}
	}, []);

	const value: Values = { screenWidth, screenHeight, mobile };

	return <ScreenSizeContext.Provider value={value}>{children}</ScreenSizeContext.Provider>;
};

export { ScreenSizeProvider, useScreenSize };
