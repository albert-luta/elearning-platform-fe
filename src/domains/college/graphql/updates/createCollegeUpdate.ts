import { MutationUpdaterFn } from '@apollo/client';
import {
	CollegesDocument,
	CollegesQuery,
	CreateCollegeMutation
} from 'generated/graphql';

export const createCollegeUpdate: MutationUpdaterFn<CreateCollegeMutation> = (
	cache,
	{ data }
) => {
	if (!data) return;
	const prevColleges = cache.readQuery<CollegesQuery>({
		query: CollegesDocument,
		variables: {
			universityId: data.createCollege.universityId
		}
	});
	if (!prevColleges) return;

	const nextColleges = [data.createCollege, ...(prevColleges.colleges ?? [])];

	cache.writeQuery<CollegesQuery>({
		query: CollegesDocument,
		data: {
			__typename: prevColleges?.__typename,
			colleges: nextColleges
		},
		variables: {
			universityId: data.createCollege.universityId
		}
	});
};
