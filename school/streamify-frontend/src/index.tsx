import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './App.css';
import LoadingPage from './container/LoadingPage/LoadingPage';
import './index.css';
import { AuthProvider } from './providers/AuthProvider/AuthProvider';
import { LayoutProvider } from './providers/LayoutProvider/LayoutProvider';
import { NotificationProvider } from './providers/NotificationProvider/NotificationProvider';
import { WindowSizeProvider } from './providers/WindowSizeProvider/WindowSizeProvider';
import packageJson from '../package.json';

const element = document.getElementById('root');
if (!element) {
	throw new Error('element with id root was not found - please check that your index html file contains one');
}

const root = createRoot(element);
root.render(
	<StrictMode>
		<Suspense fallback={<LoadingPage />}>
			<NotificationProvider>
				<WindowSizeProvider>
					<LayoutProvider>
						<AuthProvider>
							<BrowserRouter basename={packageJson.homepage}>
								<App />
							</BrowserRouter>
						</AuthProvider>
					</LayoutProvider>
				</WindowSizeProvider>
			</NotificationProvider>
		</Suspense>
	</StrictMode>,
);
