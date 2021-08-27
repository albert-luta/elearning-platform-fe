import { MutationUpdaterFn } from '@apollo/client';
import {
	CreateUniversityUserMutation,
	UniversityUsersDocument,
	UniversityUsersQuery
} from 'generated/graphql';

export const createUniversityUserUpdate: MutationUpdaterFn<CreateUniversityUserMutation> = (
	cache,
	{ data }
) => {
	if (!data) return;
	const identification = {
		query: UniversityUsersDocument,
		variables: {
			universityId: data.createUniversityUser.universityId
		}
	};
	const prevUniversityUsers = cache.readQuery<UniversityUsersQuery>(
		identification
	);
	if (!prevUniversityUsers) return;

	const nextUniversityUsers = [
		data.createUniversityUser,
		...prevUniversityUsers.universityUsers
	];

	cache.writeQuery<UniversityUsersQuery>({
		...identification,
		data: {
			__typename: prevUniversityUsers?.__typename,
			universityUsers: nextUniversityUsers
		}
	});
};
