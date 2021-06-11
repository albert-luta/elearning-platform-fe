import { MutationUpdaterFn } from '@apollo/client';
import {
	CollegesDocument,
	CollegesQuery,
	DeleteCollegeMutation
} from 'generated/graphql';

export const deleteCollegeUpdate: MutationUpdaterFn<DeleteCollegeMutation> = (
	cache,
	{ data }
) => {
	if (!data) return;
	const prevColleges = cache.readQuery<CollegesQuery>({
		query: CollegesDocument,
		variables: {
			universityId: data.deleteCollege.universityId
		}
	});
	if (!prevColleges) return;

	const nextColleges = prevColleges.colleges.filter(
		({ id }) => id !== data.deleteCollege.id
	);

	cache.writeQuery<CollegesQuery>({
		query: CollegesDocument,
		data: {
			__typename: prevColleges.__typename,
			colleges: nextColleges
		},
		variables: {
			universityId: data.deleteCollege.universityId
		}
	});
};
