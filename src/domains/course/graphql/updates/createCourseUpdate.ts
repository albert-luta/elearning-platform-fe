import { MutationUpdaterFn } from '@apollo/client';
import {
	CollegesDocument,
	CollegesQuery,
	CreateCourseMutation
} from 'generated/graphql';

export const createCourseUpdate: MutationUpdaterFn<CreateCourseMutation> = (
	cache,
	{ data }
) => {
	if (!data) return;
	const prevColleges = cache.readQuery<CollegesQuery>({
		query: CollegesDocument,
		variables: {
			universityId: data.createCourse.universityId
		}
	});
	if (!prevColleges) return;

	const nextColleges = prevColleges.colleges.map((college) => {
		if (college.id !== data.createCourse.collegeId) {
			return college;
		}

		return {
			...college,
			courses: [data.createCourse, ...college.courses]
		};
	});

	cache.writeQuery<CollegesQuery>({
		query: CollegesDocument,
		data: {
			__typename: prevColleges?.__typename,
			colleges: nextColleges
		},
		variables: {
			universityId: data.createCourse.universityId
		}
	});
};
