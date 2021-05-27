export const normalizeUpdateFormInitialValues = <
	T extends { __typename?: string; id?: string }
>(
	initialValues: T
): Omit<T, '__typename' | 'id'> => {
	const { __typename, id, ...normalizedValues } = initialValues;
	return normalizedValues;
};
