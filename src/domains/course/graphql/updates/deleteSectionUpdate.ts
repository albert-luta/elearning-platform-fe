import { MutationUpdaterFn } from '@apollo/client';
import {
	DeleteSectionMutation,
	SectionsDocument,
	SectionsQuery
} from 'generated/graphql';

export const deleteSectionUpdate: MutationUpdaterFn<DeleteSectionMutation> = (
	cache,
	{ data }
) => {
	if (!data) return;
	const prevSections = cache.readQuery<SectionsQuery>({
		query: SectionsDocument,
		variables: {
			courseId: data.deleteSection.courseId
		}
	});
	if (!prevSections) return;

	const nextSections = prevSections.sections.filter(
		({ id }) => id !== data.deleteSection.id
	);

	cache.writeQuery<SectionsQuery>({
		query: SectionsDocument,
		data: {
			__typename: prevSections.__typename,
			sections: nextSections
		},
		variables: {
			courseId: data.deleteSection.courseId
		}
	});
};
