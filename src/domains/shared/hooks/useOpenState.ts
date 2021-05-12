import { useCallback, useState } from 'react';

export const useOpenState = (initiallyOpen = false) => {
	const [isOpen, setIsOpen] = useState(initiallyOpen);
	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);

	return [isOpen, open, close] as const;
};
