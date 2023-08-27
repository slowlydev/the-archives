export const comparativeTime = (from: Date, to: Date): string => {
	const msPerMinute = 60 * 1000;
	const msPerHour = msPerMinute * 60;
	const msPerDay = msPerHour * 24;
	const msPerMonth = msPerDay * 30;
	const msPerYear = msPerDay * 365;

	const elapsed = from.getTime() - to.getTime();

	switch (true) {
		case elapsed < msPerMinute:
			return `${Math.round(elapsed / 1000)} seconds ago`;
		case elapsed < msPerHour:
			return `${Math.round(elapsed / msPerMinute)} minutes ago`;
		case elapsed < msPerDay:
			return `${Math.round(elapsed / msPerHour)} hours ago`;
		case elapsed < msPerMonth:
			return `${Math.round(elapsed / msPerDay)} days ago`;
		case elapsed < msPerYear:
			return `${Math.round(elapsed / msPerMonth)} months ago`;
		default:
			return `${Math.round(elapsed / msPerYear)} years ago`;
	}
};
