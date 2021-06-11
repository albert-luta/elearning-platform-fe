import { MutationUpdaterFn } from '@apollo/client';
import {
	CollegesDocument,
	CollegesQuery,
	DeleteCourseMutation
} from 'generated/graphql';

export const deleteCourseUpdate: MutationUpdaterFn<DeleteCourseMutation> = (
	cache,
	{ data }
) => {
	if (!data) return;
	const prevColleges = cache.readQuery<CollegesQuery>({
		query: CollegesDocument,
		variables: {
			universityId: data.deleteCourse.universityId
		}
	});
	if (!prevColleges) return;

	const nextColleges = prevColleges.colleges.map((college) => {
		if (college.id !== data.deleteCourse.collegeId) {
			return college;
		}

		return {
			...college,
			courses: college.courses.filter(
				(course) => course.id !== data.deleteCourse.id
			)
		};
	});

	cache.writeQuery<CollegesQuery>({
		query: CollegesDocument,
		data: {
			__typename: prevColleges.__typename,
			colleges: nextColleges
		},
		variables: {
			universityId: data.deleteCourse.universityId
		}
	});
};
