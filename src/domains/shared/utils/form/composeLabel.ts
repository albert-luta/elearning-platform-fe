export const composeLabel = (
	label: string,
	type: 'required' | 'optional'
): string => {
	return `${label} (${type})`;
};
