import { ApolloError } from '@apollo/client';
import { FormikErrors } from 'formik';

export const toFormikErrors = (error: ApolloError): FormikErrors<any> => {
	const validErrors = error.graphQLErrors.filter(
		(e: any) => e.statusCode === 400
	);

	return validErrors.reduce(
		(acc, { message }: any) => ({ ...acc, ...message }),
		{}
	);
};
