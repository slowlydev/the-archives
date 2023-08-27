export const cl = (...classes: (string | boolean | undefined)[]): string => {
	return classes.filter((elm) => typeof elm === 'string').join(' ');
};
