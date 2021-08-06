import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { QuestionType, useCreateQuestionMutation } from 'generated/graphql';
import { FC, memo } from 'react';
import { CreateQuestionFormValues, QuestionForm } from './QuestionForm';
import { createQuestionUpdate } from 'domains/activity/graphql/updates/createQuestionUpdate';

interface CreateQuestionFormProps {
	categoryId: string;
	onSuccess: () => void;
}

export const CreateQuestionForm: FC<CreateQuestionFormProps> = memo(
	function CreateQuestionForm({ onSuccess, categoryId }) {
		const [createQuestion] = useCreateQuestionMutation({
			update: createQuestionUpdate(categoryId)
		});
		const handleCreateQuestion = useFormikSubmit<CreateQuestionFormValues>(
			async ({ answers, type, ...data }) => {
				const res = await createQuestion({
					variables: {
						questionCategoryId: categoryId,
						data: {
							...data,
							type: type as QuestionType,
							answers: answers.map(({ fraction, ...answer }) => ({
								...answer,
								fraction: fraction / 100
							}))
						}
					}
				});
				if (!res.data) return;

				onSuccess();
			}
		);

		return <QuestionForm type="create" onCreate={handleCreateQuestion} />;
	}
);
