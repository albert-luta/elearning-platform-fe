import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { useCreateQuestionCategoryMutation } from 'generated/graphql';
import { FC, memo } from 'react';
import {
	CreateQuestionCategoryFormValues,
	QuestionCategoryForm
} from './QuestionCategoryForm';
import { createQuestionCategoryUpdate } from '../../graphql/updates/createQuestionCategoryUpdate';

interface CreateQuestionCategoryFormProps {
	onSuccess: () => void;
}

export const CreateQuestionCategoryForm: FC<CreateQuestionCategoryFormProps> = memo(
	function CreateQuestionCategoryForm({ onSuccess }) {
		const [createQuestionCategory] = useCreateQuestionCategoryMutation({
			update: createQuestionCategoryUpdate
		});
		const handleCreateQuestionCategory = useFormikSubmit<CreateQuestionCategoryFormValues>(
			async (data) => {
				const res = await createQuestionCategory({
					variables: {
						data
					}
				});
				if (!res.data) return;

				onSuccess();
			}
		);

		return (
			<QuestionCategoryForm
				type="create"
				onCreate={handleCreateQuestionCategory}
			/>
		);
	}
);
