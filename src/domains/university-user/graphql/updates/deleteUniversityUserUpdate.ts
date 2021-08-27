import { MutationUpdaterFn } from '@apollo/client';
import {
	DeleteUniversityUserMutation,
	UniversityUsersDocument,
	UniversityUsersQuery
} from 'generated/graphql';

export const deleteUniversityUserUpdate: MutationUpdaterFn<DeleteUniversityUserMutation> = (
	cache,
	{ data }
) => {
	if (!data) return;
	const identification = {
		query: UniversityUsersDocument,
		variables: {
			universityId: data.deleteUniversityUser.universityId
		}
	};
	const prevUniversityUsers = cache.readQuery<UniversityUsersQuery>(
		identification
	);
	if (!prevUniversityUsers) return;

	const nextUniversityUsers = prevUniversityUsers.universityUsers.filter(
		({ id }) => id !== data.deleteUniversityUser.id
	);

	cache.writeQuery<UniversityUsersQuery>({
		...identification,
		data: {
			__typename: prevUniversityUsers?.__typename,
			universityUsers: nextUniversityUsers
		}
	});
};
