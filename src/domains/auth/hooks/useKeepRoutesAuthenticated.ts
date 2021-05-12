import { useAuthenticateRoute } from 'domains/auth/hooks/useAuthenticateRoute';
import { NextRouterEvent } from 'domains/shared/constants/NextRouterEvent';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useKeepRoutesAuthenticated = (): void => {
	const router = useRouter();
	const authenticateRoute = useAuthenticateRoute();

	useEffect(() => {
		router.events.on(NextRouterEvent.ROUTE_CHANGE_START, authenticateRoute);

		return () => {
			router.events.off(
				NextRouterEvent.ROUTE_CHANGE_START,
				authenticateRoute
			);
		};
	}, [router.events, authenticateRoute]);
};
