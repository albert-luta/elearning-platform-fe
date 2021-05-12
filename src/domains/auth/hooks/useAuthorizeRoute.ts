import {
	AllRoutesFlatArray,
	Routes,
	RoutesGroups
} from 'domains/shared/constants/Routes';
import { findUniversity } from 'domains/shared/utils/findUniversity';
import { getUniversityIdFromRoute } from 'domains/shared/utils/route/getUniversityIdFromRoute';
import { isRouteMatching } from 'domains/shared/utils/route/isRouteMatching';
import { useMeQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { accessTokenVar } from '../reactiveVars';

export const useAuthorizeRoute = (skip = false) => {
	const router = useRouter();
	const me = useMeQuery({ skip });
	const snackbar = useSnackbar();

	const authorizeRoute = useCallback(
		async (route: string): Promise<false | void> => {
			const isAuthenticated = !!accessTokenVar();
			if (!isAuthenticated) return;
			if (me.loading) return false;
			if (!me.data?.me) return;
			if (isRouteMatching(route, RoutesGroups.PUBLIC)) return;

			const foundRoute = AllRoutesFlatArray.find((r) => {
				return isRouteMatching(route, r);
			});
			if (!foundRoute?.universityRoles) return;

			const universityId = getUniversityIdFromRoute(route);
			if (universityId == null) return;
			const foundUniversity = findUniversity(
				universityId,
				me.data.me.groupedByRoleUniversities
			);
			if (!foundUniversity) {
				snackbar.enqueueSnackbar(
					'You are not enrolled at this university',
					{ variant: 'error' }
				);
				await router.replace(Routes.user.DASHBOARD.path);
			} else if (
				!foundRoute.universityRoles.includes(foundUniversity.role)
			) {
				snackbar.enqueueSnackbar(
					"You don't have permission to access this page",
					{ variant: 'error' }
				);
				await router.replace(Routes.user.DASHBOARD.path);
			}
		},
		[router, snackbar, me.data?.me, me.loading]
	);

	return authorizeRoute;
};
