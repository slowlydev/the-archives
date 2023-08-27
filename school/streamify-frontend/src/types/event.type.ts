export type Event<T> = {
	event: 'heartbeat' | 'create' | 'update' | 'delete';
	data: T;
};
