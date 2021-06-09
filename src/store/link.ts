import { ApolloLink } from '@apollo/client';
import { accessTokenVar } from 'domains/auth/reactiveVars';
import { onError } from '@apollo/client/link/error';
import { resetStore } from 'domains/shared/utils/resetStore';
import { SnackbarUtils } from 'domains/shared/utils/snackbar';
import { selectedUniversityVar } from 'domains/university/reactiveVars';
import { createUploadLink } from 'apollo-upload-client';
import Router from 'next/router';
import { Routes } from 'domains/shared/constants/Routes';
import { isBrowser } from 'domains/shared/utils/isBrowser';

const uploadLink = createUploadLink({
	uri: process.env.NEXT_PUBLIC_BACKEND_URL,
	credentials: 'include'
});

const authLink = new ApolloLink((operation, forward) => {
	const accessToken = accessTokenVar();

	operation.setContext((prevContext: Record<string, any>) => ({
		...prevContext,
		headers: {
			...prevContext.headers,
			...(accessToken != null && {
				authorization: `Bearer ${accessToken}`
			})
		}
	}));

	return forward(operation);
});

const universityLink = new ApolloLink((operation, forward) => {
	const univeristy = selectedUniversityVar();

	operation.setContext((prevContext: Record<string, any>) => ({
		...prevContext,
		headers: {
			...prevContext.headers,
			...(univeristy != null && { 'x-university-id': univeristy.id })
		}
	}));

	return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(({ statusCode, message }: any) => {
			if (statusCode === 401) {
				resetStore();
				if (
					isBrowser() &&
					Router.asPath !== Routes.auth.LOGIN_REGISTER.path
				) {
					Router.push(Routes.auth.LOGIN_REGISTER.path);
				}
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
			} else if (statusCode === 403) {
				if (
					isBrowser() &&
					Router.asPath !== Routes.user.DASHBOARD.path
				) {
					Router.push(Routes.user.DASHBOARD.path);
				}
				SnackbarUtils.enqueueSnackbar(
					'You are not authorized to access/modify this resource',
					{
						variant: 'error'
					}
				);
			} else if (statusCode === 404) {
				if (
					isBrowser() &&
					Router.asPath !== Routes.user.DASHBOARD.path
				) {
					Router.push(Routes.user.DASHBOARD.path);
				}
				SnackbarUtils.enqueueSnackbar(
					'Requested resource was not found',
					{
						variant: 'error'
					}
				);
			} else if (statusCode === 500) {
				if (
					isBrowser() &&
					Router.asPath !== Routes.user.DASHBOARD.path
				) {
					Router.push(Routes.user.DASHBOARD.path);
				}
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
		if (isBrowser() && Router.asPath !== Routes.presentation.LANDING.path) {
			Router.push(Routes.presentation.LANDING.path);
		}
		SnackbarUtils.enqueueSnackbar(
			'There was a network error, please check your connection or try again later!',
			{ variant: 'error' }
		);
	}
});

export const link = errorLink.concat(
	authLink.concat(universityLink.concat(uploadLink))
);
