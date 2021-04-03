import { ApolloError } from '@apollo/client';

export const toFormikErrors = (error: ApolloError): Record<string, string> => {
	const validErrors = error.graphQLErrors.filter(
		(e: any) => e.statusCode === 400
	);

	return validErrors.reduce(
		(acc, { message }: any) => ({ ...acc, ...message }),
		{}
	);
};
