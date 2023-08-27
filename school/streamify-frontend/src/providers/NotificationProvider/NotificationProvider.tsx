import { createContext, ReactElement, ReactNode, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Notification } from '../../types/notification.type';
import { cl } from '../../utils/classnames.util';
import styles from './NotificationProvider.module.css';

type Props = {
	children: ReactNode;
};

type Values = {
	notifications: Notification[];
	addSuccess: (message: Notification['message']) => void;
	addFailure: (message: Notification['message']) => void;
};

const useNotifications = (): Values => {
	return useContext(NotificationContext);
};

const NotificationContext = createContext<Values>({
	notifications: [],
	addSuccess: () => null,
	addFailure: () => null,
});

const NotificationProvider = ({ children }: Props): ReactElement => {
	const { t } = useTranslation();

	const [notifications, setNotifications] = useState<Notification[]>([]);

	const clearNotification = (id: Notification['id']): void => {
		setNotifications((notifications) => notifications.filter((notification) => notification.id !== id));
	};

	const addSuccess = (message: Notification['message']): void => {
		const id = Date.now();
		setNotifications([
			...notifications,
			{
				id,
				type: 'success',
				message,
			},
		]);
		setTimeout(() => clearNotification(id), 4000);
	};

	const addFailure = (message: Notification['message']): void => {
		const id = Date.now();
		setNotifications([
			...notifications,
			{
				id,
				type: 'failure',
				message,
			},
		]);
		setTimeout(() => clearNotification(id), 8000);
	};

	const value: Values = { notifications, addSuccess, addFailure };

	return (
		<NotificationContext.Provider value={value}>
			<div className={styles.wrapper}>
				{notifications
					.sort((a, b) => b.id - a.id)
					.map((notification) => (
						<div
							key={notification.id}
							className={cl(
								styles.notification,
								notification.type === 'success' && styles.successBody,
								notification.type === 'failure' && styles.failureBody,
							)}
						>
							<div className={styles.header}>
								<div
									className={cl(
										styles.label,
										notification.type === 'success' && styles.successLabel,
										notification.type === 'failure' && styles.failureLabel,
									)}
								>
									{t(`notifications.type.${notification.type}`)}
								</div>
							</div>
							<div className={styles.message}>{notification.message}</div>
						</div>
					))}
			</div>
			{children}
		</NotificationContext.Provider>
	);
};

export { NotificationProvider, useNotifications };
