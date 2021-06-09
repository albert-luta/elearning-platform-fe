import { useCallback, useState } from 'react';

export const useBooleanState = (initiallyOpen = false) => {
	const [isOpen, setIsOpen] = useState(initiallyOpen);
	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);
	const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

	return [isOpen, open, close, toggle] as const;
};
