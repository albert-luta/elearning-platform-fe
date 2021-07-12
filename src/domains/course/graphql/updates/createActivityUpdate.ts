import { ApolloCache } from '@apollo/client';
import {
	CreateAssignmentMutation,
	CreateQuizMutation,
	CreateResourceMutation,
	SectionsDocument,
	SectionsQuery
} from 'generated/graphql';

export const createActivityUpdate = <
	T extends
		| CreateResourceMutation
		| CreateAssignmentMutation
		| CreateQuizMutation
>(
	cache: ApolloCache<T>,
	activity:
		| CreateResourceMutation['createResource']
		| CreateAssignmentMutation['createAssignment']
		| CreateQuizMutation['createQuiz'],
	courseId: string
) => {
	const prevSections = cache.readQuery<SectionsQuery>({
		query: SectionsDocument,
		variables: {
			courseId
		}
	});
	if (!prevSections) return;

	const nextSections = prevSections.sections.map((section) => {
		if (section.id !== activity.sectionId) {
			return section;
		}

		return {
			...section,
			activities: [...section.activities, activity]
		};
	});

	cache.writeQuery<SectionsQuery>({
		query: SectionsDocument,
		data: {
			__typename: prevSections?.__typename,
			sections: nextSections
		},
		variables: {
			courseId
		}
	});
};
