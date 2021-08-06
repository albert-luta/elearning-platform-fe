import { MutationUpdaterFn } from '@apollo/client';
import {
	DeleteQuestionMutation,
	QuestionCategoryFieldsFragment,
	QuestionCategoryFieldsFragmentDoc
} from 'generated/graphql';

export const deleteQuestionUpdate = (
	categoryId: string
): MutationUpdaterFn<DeleteQuestionMutation> => (cache, { data }) => {
	if (!data) return;

	const identification = {
		id: `QuestionCategoryObject:${categoryId}`,
		fragmentName: 'QuestionCategoryFields',
		fragment: QuestionCategoryFieldsFragmentDoc
	};

	const prevQuestionCategory = cache.readFragment<QuestionCategoryFieldsFragment>(
		identification
	);
	if (!prevQuestionCategory) return;

	const nextQuestionCategory = {
		...prevQuestionCategory,
		questions: prevQuestionCategory.questions.filter(
			({ id }) => id !== data.deleteQuestion.id
		)
	};

	cache.writeFragment<QuestionCategoryFieldsFragment>({
		...identification,
		data: nextQuestionCategory
	});
};
