import { NextRouterEvent } from 'domains/shared/constants/NextRouterEvent';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthorizeRoute } from './useAuthorizeRoute';

export const useKeepRoutesAuthorized = (): void => {
	const router = useRouter();
	const authorizeRoute = useAuthorizeRoute();

	useEffect(() => {
		router.events.on(NextRouterEvent.ROUTE_CHANGE_START, authorizeRoute);

		return () => {
			router.events.off(
				NextRouterEvent.ROUTE_CHANGE_START,
				authorizeRoute
			);
		};
	}, [router.events, authorizeRoute]);
};
