import { Box, CircularProgress, Typography } from '@material-ui/core';
import { Routes } from 'domains/shared/constants/Routes';
import { isRouteMatching } from 'domains/shared/utils/route/isRouteMatching';
import { useSyncSelectedUniversity } from 'domains/university/hooks/useSyncSelectedUniversity';
import { useMeQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import { FC, memo, useEffect, useState } from 'react';
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
	const syncSelectedUniversity = useSyncSelectedUniversity(
		!finishedFirstRequest
	);
	const me = useMeQuery({ skip: !finishedFirstRequest });
	const [
		finishedFirstRouteAuthorization,
		setFinishedFirstRouteAuthorization
	] = useState(false);
	useEffect(() => {
		if (
			!me.loading &&
			finishedFirstRouteAuthentication &&
			!finishedFirstRouteAuthorization
		) {
			authorizeRoute(router.asPath).then(() => {
				syncSelectedUniversity(router.asPath);
				setFinishedFirstRouteAuthorization(true);
			});
		}
	}, [me.loading, finishedFirstRouteAuthentication, finishedFirstRouteAuthorization, authorizeRoute, router.asPath, syncSelectedUniversity]);

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
