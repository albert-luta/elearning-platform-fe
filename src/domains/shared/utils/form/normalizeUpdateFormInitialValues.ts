export const normalizeUpdateFormInitialValues = <
	T extends { __typename?: string; id?: string; universityId?: string }
>(
	initialValues: T
): Omit<T, '__typename' | 'id' | 'universityId'> => {
	const { __typename, id, universityId, ...normalizedValues } = initialValues;
	return normalizedValues;
};
