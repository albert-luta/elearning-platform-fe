import { MutationUpdaterFn } from '@apollo/client';
import {
	CreateSectionMutation,
	SectionsDocument,
	SectionsQuery
} from 'generated/graphql';

export const createSectionUpdate: MutationUpdaterFn<CreateSectionMutation> = (
	cache,
	{ data }
) => {
	if (!data) return;
	const prevSections = cache.readQuery<SectionsQuery>({
		query: SectionsDocument,
		variables: {
			courseId: data.createSection.courseId
		}
	});
	if (!prevSections) return;

	const nextSections = [...(prevSections.sections ?? []), data.createSection];

	cache.writeQuery<SectionsQuery>({
		query: SectionsDocument,
		data: {
			__typename: prevSections?.__typename,
			sections: nextSections
		},
		variables: {
			courseId: data.createSection.courseId
		}
	});
};
