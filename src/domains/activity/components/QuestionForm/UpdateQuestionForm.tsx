import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { normalizeUpdateFormInitialValues } from 'domains/shared/utils/form/normalizeUpdateFormInitialValues';
import {
	QuestionObject,
	QuestionType,
	useUpdateQuestionMutation
} from 'generated/graphql';
import { FC, memo } from 'react';
import { QuestionForm, UpdateQuestionFormValues } from './QuestionForm';

interface UpdateQuestionFormProps {
	question: QuestionObject;
	onSuccess: () => void;
}

export const UpdateQuestionForm: FC<UpdateQuestionFormProps> = memo(
	function UpdateQuestionForm({ onSuccess, question }) {
		const [updateQuestion] = useUpdateQuestionMutation();
		const handleUpdateQuestion = useFormikSubmit<UpdateQuestionFormValues>(
			async ({ answers, type, ...data }) => {
				const res = await updateQuestion({
					variables: {
						id: question.id,
						data: {
							...data,
							type: type as QuestionType,
							answers: answers.map(
								({ fraction, ...answer }, i) => ({
									...answer,
									fraction: fraction / 100,
									order: i
								})
							)
						}
					}
				});
				if (!res.data) return;

				onSuccess();
			}
		);

		const { answers, ...initialValues } = normalizeUpdateFormInitialValues(
			question
		);

		return (
			<QuestionForm
				type="update"
				initialValues={{
					...initialValues,
					answers: answers.map(({ fraction, ...answer }) =>
						normalizeUpdateFormInitialValues({
							...answer,
							fraction: fraction * 100
						})
					)
				}}
				onUpdate={handleUpdateQuestion}
			/>
		);
	}
);
