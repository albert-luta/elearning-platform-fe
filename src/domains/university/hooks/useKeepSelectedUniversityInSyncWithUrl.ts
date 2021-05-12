import { NextRouterEvent } from 'domains/shared/constants/NextRouterEvent';
import { findUniversity } from 'domains/shared/utils/findUniversity';
import { getUniversityIdFromRoute } from 'domains/shared/utils/route/getUniversityIdFromRoute';
import { useMeQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { selectedUniversityVar } from '../reactiveVars';

export const useKeepSelectedUniversityInSyncWithUrl = (): void => {
	const router = useRouter();
	const me = useMeQuery();

	useEffect(() => {
		const handleRouteChange = (route: string): void => {
			if (me.loading || !me.data?.me) return;

			const prevSelectedUniversity = selectedUniversityVar();
			const nextUniversityId = getUniversityIdFromRoute(route);
			if (nextUniversityId == null) {
				if (prevSelectedUniversity != null) {
					selectedUniversityVar(null);
				}

				return;
			}

			if (prevSelectedUniversity?.id === nextUniversityId) {
				return;
			}
			const nextSelectedUniversity = findUniversity(
				nextUniversityId,
				me.data.me.groupedByRoleUniversities
			);
			selectedUniversityVar(nextSelectedUniversity);
		};

		router.events.on(NextRouterEvent.ROUTE_CHANGE_START, handleRouteChange);

		return () => {
			router.events.off(
				NextRouterEvent.ROUTE_CHANGE_START,
				handleRouteChange
			);
		};
	}, [me.loading, me.data?.me, router.events]);
};
