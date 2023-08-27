export const handleSigninRedirect = (signinRoute: string | null): string => {
	if (!signinRoute) {
		return '/';
	}
	if (signinRoute.includes('/auth')) {
		return '/';
	}
	return signinRoute;
};
