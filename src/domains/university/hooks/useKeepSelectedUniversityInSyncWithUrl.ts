import { NextRouterEvent } from 'domains/shared/constants/NextRouterEvent';
import { Routes } from 'domains/shared/constants/Routes';
import { toValidUserRole } from 'domains/shared/utils/toValidUserRole';
import { useMeQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import { pathToRegexp } from 'path-to-regexp';
import { useEffect } from 'react';
import { selectedUniversityVar } from '../reactiveVars';

interface UseKeepSelectedUniversityInSyncWithUrlProps {
	skip: boolean;
}

export const useKeepSelectedUniversityInSyncWithUrl = ({
	skip
}: UseKeepSelectedUniversityInSyncWithUrlProps): void => {
	const router = useRouter();
	const me = useMeQuery({ skip });

	useEffect(() => {
		const handleRouteChange = (url: string): void => {
			if (skip) return;

			const universityRouteRegexp = pathToRegexp(
				Routes.university.DASHBOARD + '/:optional*'
			);
			const res = universityRouteRegexp.exec(url);

			const prevSelectedUniversity = selectedUniversityVar();
			if (res == null || me.data == null) {
				if (prevSelectedUniversity != null) {
					selectedUniversityVar(null);
				}

				return;
			}

			const nextUniversityId = res[1];
			if (prevSelectedUniversity?.id === nextUniversityId) {
				return;
			}
			for (const { role, universities } of me.data.me
				.groupedByRoleUniversities) {
				for (const university of universities) {
					if (university.id === nextUniversityId) {
						const nextSelectedUniversity = {
							...university,
							role: toValidUserRole(role)
						};

						selectedUniversityVar(nextSelectedUniversity);
						return;
					}
				}
			}
		};

		router.events.on(
			NextRouterEvent.ROUTE_CHANGE_COMPLETE,
			handleRouteChange
		);

		return () => {
			router.events.off(
				NextRouterEvent.ROUTE_CHANGE_COMPLETE,
				handleRouteChange
			);
		};
	});
};
