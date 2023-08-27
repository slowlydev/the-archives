import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import LoadingPage from '../../container/LoadingPage/LoadingPage';
import { useAuth } from '../../providers/AuthProvider/AuthProvider';

const PrivateRoute = (): ReactElement => {
	const { user, loading, signingUp, signingIn } = useAuth();

	if (loading) {
		return <LoadingPage />;
	}

	if (!user && !signingUp && !signingIn) {
		sessionStorage.setItem('signin_route', window.location.pathname);
		return <Navigate to={'/auth/signin'} replace />;
	}

	return <Outlet />;
};

export default PrivateRoute;
