import {
	createContext,
	ReactNode,
	useContext,
	ReactElement,
	useState,
	SetStateAction,
	Dispatch,
	useEffect,
} from 'react';

const LayoutContext = createContext<Values>({
	title: 'Streamify',
	setTitle: () => void 0,
});

type Props = {
	children: ReactNode;
};

type Values = {
	title: string;
	setTitle: Dispatch<SetStateAction<string>>;
};

const useLayoutProvider = (): Values => {
	return useContext(LayoutContext);
};

const LayoutProvider = ({ children }: Props): ReactElement => {
	const [title, setTitle] = useState<string>('Streamify');

	useEffect(() => {
		document.title = title;
	}, [title]);

	const value: Values = { title, setTitle };

	return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

export { LayoutProvider, useLayoutProvider };
