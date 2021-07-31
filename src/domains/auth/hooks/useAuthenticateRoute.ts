import { Routes, RoutesGroups } from 'domains/shared/constants/Routes';
import { isRouteMatching } from 'domains/shared/utils/route/isRouteMatching';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { accessTokenVar } from '../reactiveVars';

export const useAuthenticateRoute = () => {
	const router = useRouter();
	const snackbar = useSnackbar();

	const authenticateRoute = useCallback(
		async (route: string): Promise<void> => {
			const isAuthenticated = !!accessTokenVar();

			if (
				isAuthenticated &&
				isRouteMatching(route, Object.values(Routes.auth))
			) {
				snackbar.enqueueSnackbar(
					'You are already authenticated, you will be redirected',
					{
						variant: 'info'
					}
				);
				await router.replace(Routes.user.DASHBOARD.path);
			} else if (
				!isAuthenticated &&
				!isRouteMatching(route, RoutesGroups.PUBLIC)
			) {
				snackbar.enqueueSnackbar(
					'You are not authenticated, you will be redirected',
					{ variant: 'error' }
				);
				await router.replace(Routes.auth.LOGIN_REGISTER.path);
			}
		},
		[snackbar, router]
	);

	return authenticateRoute;
};
