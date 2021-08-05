import { MutationUpdaterFn } from '@apollo/client';
import {
	CreateQuestionCategoryMutation,
	QuestionBankDocument,
	QuestionBankQuery
} from 'generated/graphql';

export const createQuestionCategoryUpdate: MutationUpdaterFn<CreateQuestionCategoryMutation> = (
	cache,
	{ data }
) => {
	if (!data) return;
	const prevQuestionBank = cache.readQuery<QuestionBankQuery>({
		query: QuestionBankDocument
	});
	if (!prevQuestionBank) return;

	const nextQuestionBank = [
		{ ...data.createQuestionCategory, questions: [] },
		...prevQuestionBank.questionBank
	];

	cache.writeQuery<QuestionBankQuery>({
		query: QuestionBankDocument,
		data: {
			__typename: prevQuestionBank?.__typename,
			questionBank: nextQuestionBank
		}
	});
};
