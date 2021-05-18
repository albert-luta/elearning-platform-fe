import { MutationUpdaterFn } from '@apollo/client';
import {
	GroupedByRoleUniversitiesObject,
	LeaveUniversityMutation,
	MeDocument,
	MeQuery
} from 'generated/graphql';

export const removeUniversityUpdate: MutationUpdaterFn<LeaveUniversityMutation> = (
	cache,
	{ data }
) => {
	const me = cache.readQuery<MeQuery>({ query: MeDocument });
	if (!me || !data) return;

	const oldUniversitiesGroups = me.me.groupedByRoleUniversities;
	const universityToRemoveGroup = oldUniversitiesGroups.find(
		({ universities }) => {
			return !!universities.find(
				({ id }) => id === data.leaveUniversity.id
			);
		}
	);
	if (!universityToRemoveGroup) return;

	const universityToRemoveGroupFiltered: GroupedByRoleUniversitiesObject = {
		...universityToRemoveGroup,
		universities: universityToRemoveGroup.universities.filter(
			({ id }) => id !== data.leaveUniversity.id
		)
	};
	const restGroups = oldUniversitiesGroups.filter(
		({ role }) => role !== universityToRemoveGroup.role
	);

	const groupedByRoleUniversities: GroupedByRoleUniversitiesObject[] = [
		...restGroups
	];
	if (universityToRemoveGroupFiltered.universities.length) {
		groupedByRoleUniversities.push(universityToRemoveGroupFiltered);
	}

	cache.writeQuery<MeQuery>({
		query: MeDocument,
		data: {
			__typename: me.__typename,
			me: {
				...me.me,
				groupedByRoleUniversities
			}
		}
	});
};
