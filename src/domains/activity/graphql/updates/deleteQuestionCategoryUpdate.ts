import { MutationUpdaterFn } from '@apollo/client';
import {
	DeleteQuestionCategoryMutation,
	QuestionBankDocument,
	QuestionBankQuery
} from 'generated/graphql';

export const deleteQuestionCategoryUpdate: MutationUpdaterFn<DeleteQuestionCategoryMutation> = (
	cache,
	{ data }
) => {
	if (!data) return;
	const prevQuestionBank = cache.readQuery<QuestionBankQuery>({
		query: QuestionBankDocument
	});
	if (!prevQuestionBank) return;

	const nextQuestionBank = prevQuestionBank.questionBank.filter(
		({ id }) => id !== data.deleteQuestionCategory.id
	);

	cache.writeQuery<QuestionBankQuery>({
		query: QuestionBankDocument,
		data: {
			__typename: prevQuestionBank?.__typename,
			questionBank: nextQuestionBank
		}
	});
};
