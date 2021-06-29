import { MutationUpdaterFn } from '@apollo/client';
import {
	DeleteActivityMutation,
	SectionsDocument,
	SectionsQuery
} from 'generated/graphql';

export const deleteActivityUpdate = (
	courseId: string
): MutationUpdaterFn<DeleteActivityMutation> => (cache, { data }) => {
	if (!data) return;
	const prevSections = cache.readQuery<SectionsQuery>({
		query: SectionsDocument,
		variables: {
			courseId
		}
	});
	if (!prevSections) return;

	const nextSections = prevSections.sections.map((section) => {
		if (section.id !== data.deleteActivity.sectionId) {
			return section;
		}

		return {
			...section,
			activities: section.activities.filter(
				({ id }) => id !== data.deleteActivity.id
			)
		};
	});

	cache.writeQuery<SectionsQuery>({
		query: SectionsDocument,
		data: {
			__typename: prevSections.__typename,
			sections: nextSections
		},
		variables: {
			courseId
		}
	});
};
