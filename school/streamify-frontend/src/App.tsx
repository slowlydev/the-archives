import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ProfileBar from './components/ProfileBar/ProfileBar';
import HomePage from './container/HomePage/HomePage';
import NotFoundPage from './container/NotFoundPage/NotFoundPage';
import SigninPage from './container/SigninPage/SigninPage';
import SignupPage from './container/SignupPage/SignupPage';
import UserDetailPage from './container/UserDetailPage/UserDetailPage';
import VideoDetailPage from './container/VideoDetailPage/VideoDetailPage';

const App = (): ReactElement => {
	return (
		<div className={'main-wrapper'}>
			<ProfileBar />
			<Routes>
				<Route path={'*'} element={<NotFoundPage />} />

				<Route path={'/'} element={<PrivateRoute />}>
					<Route path={'/'} element={<HomePage />} />
				</Route>

				<Route path={'/video/:id'} element={<PrivateRoute />}>
					<Route path={'/video/:id'} element={<VideoDetailPage />} />
				</Route>

				<Route path={'/user/:id'} element={<PrivateRoute />}>
					<Route path={'/user/:id'} element={<UserDetailPage />} />
				</Route>

				<Route path={'/auth/signup'} element={<SignupPage />} />
				<Route path={'/auth/signin'} element={<SigninPage />} />
			</Routes>
		</div>
	);
};

export default App;
