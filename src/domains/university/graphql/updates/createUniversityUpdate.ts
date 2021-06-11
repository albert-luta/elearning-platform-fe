import { MutationUpdaterFn } from '@apollo/client';
import { UserRole } from 'domains/shared/constants/UserRole';
import {
	CreateUniversityMutation,
	GroupedByRoleUniversitiesObject,
	MeDocument,
	MeQuery
} from 'generated/graphql';

export const createUniversityUpdate: MutationUpdaterFn<CreateUniversityMutation> = (
	cache,
	{ data }
) => {
	const me = cache.readQuery<MeQuery>({ query: MeDocument });
	if (!me || !data) return;

	const oldUniversitiesGroups = me.me.groupedByRoleUniversities;
	const restUniversitiesGroups = oldUniversitiesGroups.filter(
		({ role }) => role !== UserRole.ADMIN
	);
	const oldUniversitiesAdmin: GroupedByRoleUniversitiesObject = oldUniversitiesGroups.find(
		({ role }) => role === UserRole.ADMIN
	) ?? {
		__typename: 'GroupedByRoleUniversitiesObject',
		role: UserRole.ADMIN,
		universities: []
	};
	const newUniversitiesAdmin: GroupedByRoleUniversitiesObject = {
		...oldUniversitiesAdmin,
		universities: [
			...oldUniversitiesAdmin.universities,
			data.createUniversity
		]
	};
	const groupedByRoleUniversities: GroupedByRoleUniversitiesObject[] = [
		...restUniversitiesGroups,
		newUniversitiesAdmin
	];

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
