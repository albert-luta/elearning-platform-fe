import humanizeDuration from 'humanize-duration';

export const formatDuration = (
	ms: number,
	type: 'words' | 'clock' = 'words'
): string => {
	if (type === 'words') {
		return humanizeDuration(ms, { largest: 2, round: true });
	}

	const seconds = Math.floor((ms / 1000) % 60);
	const minutes = Math.floor((ms / (1000 * 60)) % 60);
	const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
	return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
		2,
		'0'
	)}:${String(seconds).padStart(2, '0')}`;
};
