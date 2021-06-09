import { findUniversity } from 'domains/shared/utils/findUniversity';
import { getUniversityIdFromRoute } from 'domains/shared/utils/route/getUniversityIdFromRoute';
import { useMeQuery } from 'generated/graphql';
import { useCallback } from 'react';
import { selectedUniversityVar } from '../reactiveVars';

export const useSyncSelectedUniversity = (skip = false) => {
	const me = useMeQuery({ skip });

	const syncSelectedUniversity = useCallback(
		(route: string): void => {
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
		},
		[me.data?.me, me.loading]
	);

	return syncSelectedUniversity;
};
