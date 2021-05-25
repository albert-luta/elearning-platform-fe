import * as yup from 'yup';

export const yupMap = <S, V>(valueSchema: S): any => {
	return yup.lazy((obj: Record<string, V>) =>
		yup.object(
			Object.keys(obj).reduce(
				/*<Record<string, S>>*/ (acc, curr) => ({
					...acc,
					[curr]: valueSchema
				}),
				{}
			)
		)
	);
};
