import { MutationUpdaterFn } from '@apollo/client';
import {
	CreateQuestionMutation,
	QuestionCategoryFieldsFragment,
	QuestionCategoryFieldsFragmentDoc
} from 'generated/graphql';

export const createQuestionUpdate = (
	categoryId: string
): MutationUpdaterFn<CreateQuestionMutation> => (cache, { data }) => {
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
		questions: [...prevQuestionCategory.questions, data.createQuestion]
	};

	cache.writeFragment<QuestionCategoryFieldsFragment>({
		...identification,
		data: nextQuestionCategory
	});
};
