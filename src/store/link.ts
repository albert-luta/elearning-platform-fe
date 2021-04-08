import { ApolloLink, HttpLink } from '@apollo/client';
import { accessTokenVar } from 'domains/auth/reactiveVars';
import { onError } from '@apollo/client/link/error';
import { resetStore } from 'domains/shared/utils/resetStore';
import { SnackbarUtils } from 'domains/shared/utils/snackbar';

const httpLink = new HttpLink({
	uri: process.env.NEXT_PUBLIC_BACKEND_URL,
	credentials: 'include'
});

const authLink = new ApolloLink((operation, forward) => {
	const accessToken = accessTokenVar();

	operation.setContext({
		headers: {
			authorization: accessToken ? `Bearer ${accessToken}` : null
		}
	});

	return forward(operation);
});

const logoutLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(({ statusCode, message }: any) => {
			if (statusCode === 401) {
				resetStore();
				if (
					message === 'logout' ||
					message === 'jwt must be provided'
				) {
					return;
				}

				let snackbarMessage: string;
				if (message === 'jwt expired') {
					snackbarMessage =
						"You didn't login in a long time, so you were disconnected!";
				} else {
					snackbarMessage =
						'There was a security issue, so you were disconnected!';
				}
				SnackbarUtils.enqueueSnackbar(snackbarMessage, {
					variant: 'error'
				});
			} else if (statusCode === 500) {
				SnackbarUtils.enqueueSnackbar(
					'There was an internal server error, please try again later!',
					{
						variant: 'error'
					}
				);
			}
		});
	}

	if (networkError) {
		SnackbarUtils.enqueueSnackbar(
			'There was a network error, please check your connection or try again later!',
			{ variant: 'error' }
		);
	}
});

export const link = logoutLink.concat(authLink.concat(httpLink));
