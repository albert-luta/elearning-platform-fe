import { useEffect, useRef, useState } from 'react';

export interface Countdown {
	duration: number;
	hasCompleted: boolean;
}

export const useCountdown = (deadline: number, overtime = false): Countdown => {
	const interval = useRef<NodeJS.Timeout | null>(null);
	const [duration, setDuration] = useState(deadline - Date.now());
	const [hasCompleted, setHasCompleted] = useState(false);

	useEffect(() => {
		const updateDuration = () => {
			const newDuration = deadline - Date.now();

			if (overtime) {
				setDuration(Math.abs(newDuration));
			} else if (newDuration <= 0) {
				setDuration(0);
				setHasCompleted(true);
				if (interval.current != null) {
					clearInterval(interval.current);
				}
			} else {
				setDuration(newDuration);
			}
		};

		updateDuration();
		interval.current = setInterval(updateDuration, 1000);

		return () => {
			if (interval.current != null) {
				clearInterval(interval.current);
			}
		};
	}, [deadline, overtime]);

	return { duration, hasCompleted };
};
