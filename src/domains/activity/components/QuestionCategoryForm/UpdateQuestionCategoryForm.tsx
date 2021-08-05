import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { normalizeUpdateFormInitialValues } from 'domains/shared/utils/form/normalizeUpdateFormInitialValues';
import {
	QuestionCategoryObject,
	useUpdateQuestionCategoryMutation
} from 'generated/graphql';
import { FC, memo } from 'react';
import {
	QuestionCategoryForm,
	UpdateQuestionCategoryFormValues
} from './QuestionCategoryForm';

interface UpdateQuestionCategoryFormProps {
	category: QuestionCategoryObject;
	onSuccess: () => void;
}

export const UpdateQuestionCategoryForm: FC<UpdateQuestionCategoryFormProps> = memo(
	function UpdateQuestionCategoryForm({ category, onSuccess }) {
		const [updateQuestionCategory] = useUpdateQuestionCategoryMutation();
		const handleUpdateQuestionCategory = useFormikSubmit<UpdateQuestionCategoryFormValues>(
			async (data) => {
				const res = await updateQuestionCategory({
					variables: {
						id: category.id,
						data
					}
				});
				if (!res.data) return;

				onSuccess();
			}
		);

		const {
			questions,
			...initialValues
		} = normalizeUpdateFormInitialValues(category);

		return (
			<QuestionCategoryForm
				type="update"
				initialValues={initialValues}
				onUpdate={handleUpdateQuestionCategory}
			/>
		);
	}
);
