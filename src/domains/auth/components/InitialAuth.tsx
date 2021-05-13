import { Box, CircularProgress, Typography } from '@material-ui/core';
import { Routes } from 'domains/shared/constants/Routes';
import { isRouteMatching } from 'domains/shared/utils/route/isRouteMatching';
import { useRouter } from 'next/router';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useAuthenticateRoute } from '../hooks/useAuthenticateRoute';
import { useAuthorizeRoute } from '../hooks/useAuthorizeRoute';
import { useRefreshTokens } from '../hooks/useRefreshTokens';

export const InitialAuth: FC = memo(function InitialAuth({ children }) {
	const refreshTokens = useRefreshTokens();
	const [finishedFirstRequest, setFinishedFirstRequest] = useState(false);
	useEffect(() => {
		if (finishedFirstRequest) return;

		refreshTokens().then(() => {
			setFinishedFirstRequest(true);
		});
	}, [finishedFirstRequest, refreshTokens]);

	const router = useRouter();
	const authenticateRoute = useAuthenticateRoute();
	const [
		finishedFirstRouteAuthentication,
		setFinishedFirstRouteAuthentication
	] = useState(false);
	useEffect(() => {
		if (finishedFirstRequest && !finishedFirstRouteAuthentication) {
			authenticateRoute(router.asPath).then(() => {
				setFinishedFirstRouteAuthentication(true);
			});
		}
	}, [finishedFirstRequest, finishedFirstRouteAuthentication, authenticateRoute, router.asPath]);

	const authorizeRoute = useAuthorizeRoute(!finishedFirstRequest);
	const [
		finishedFirstRouteAuthorization,
		setFinishedFirstRouteAuthorization
	] = useState(false);
	const [, setFU] = useState({});
	const forceUpdate = useCallback(() => setFU({}), []);
	useEffect(() => {
		if (
			finishedFirstRouteAuthentication &&
			!finishedFirstRouteAuthorization
		) {
			authorizeRoute(router.asPath).then(async (fetchedMe) => {
				if (fetchedMe === false) {
					setTimeout(forceUpdate, 100);
					return;
				}
				// If the route was ok, kick in the next router events(useful for useKeepSelectedUniversityInSyncWithUrl hook - initialization)
				await router.replace(router.asPath);
				setFinishedFirstRouteAuthorization(true);
			});
		}
	}, [finishedFirstRouteAuthentication, finishedFirstRouteAuthorization, authorizeRoute, router.asPath, forceUpdate, router]);

	if (
		!isRouteMatching(router.asPath, Object.values(Routes.presentation)) &&
		(!finishedFirstRequest ||
			!finishedFirstRouteAuthentication ||
			!finishedFirstRouteAuthorization)
	) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height="100vh"
				flexDirection="column"
			>
				<CircularProgress color="inherit" />
				<Box mt={2}>
					<Typography variant="h5">Loading...</Typography>
				</Box>
			</Box>
		);
	}

	return <>{children}</>;
});
