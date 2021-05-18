import { ApolloCache } from '@apollo/client';
import {
	GroupedByRoleUniversitiesObject,
	MeDocument,
	MeQuery,
	UniversityObject
} from 'generated/graphql';

export const removeUniversity = <T>(
	cache: ApolloCache<T>,
	university: UniversityObject
) => {
	const me = cache.readQuery<MeQuery>({ query: MeDocument });
	if (!me) return;

	const oldUniversitiesGroups = me.me.groupedByRoleUniversities;
	const universityToRemoveGroup = oldUniversitiesGroups.find(
		({ universities }) => {
			return !!universities.find(({ id }) => id === university.id);
		}
	);
	if (!universityToRemoveGroup) return;

	const universityToRemoveGroupFiltered: GroupedByRoleUniversitiesObject = {
		...universityToRemoveGroup,
		universities: universityToRemoveGroup.universities.filter(
			({ id }) => id !== university.id
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
