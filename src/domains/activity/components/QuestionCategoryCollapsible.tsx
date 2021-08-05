import { ListItemCollapsible } from 'domains/shared/components/list/ListItemCollapsible';
import { ModifyResourceAction } from 'domains/shared/components/ModifyResourceAction';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import {
	QuestionCategoryObject,
	useDeleteQuestionCategoryMutation
} from 'generated/graphql';
import { FC, memo, useCallback } from 'react';
import { deleteQuestionCategoryUpdate } from '../graphql/updates/deleteQuestionCategoryUpdate';
import { UpdateQuestionCategoryForm } from './QuestionCategoryForm/UpdateQuestionCategoryForm';

interface QuestionCategoryCollapsibleProps {
	category: QuestionCategoryObject;
}

export const QuestionCategoryCollapsible: FC<QuestionCategoryCollapsibleProps> = memo(
	function QuestionCategoryCollapsible({ category }) {
		const [isOpen, , , toggleIsOpen] = useBooleanState();

		const [
			deleteQuestionCategory,
			{ loading: deleteQuestionCategoryLoading }
		] = useDeleteQuestionCategoryMutation({
			update: deleteQuestionCategoryUpdate
		});
		const handleDeleteQuestionCategory = useCallback((): void => {
			deleteQuestionCategory({
				variables: {
					id: category.id
				}
			}).catch(() => null);
		}, [deleteQuestionCategory, category.id]);

		return (
			<ListItemCollapsible
				isOpen={isOpen}
				onToggle={toggleIsOpen}
				name={category.name}
				action={
					<ModifyResourceAction
						// Shared
						resourceName={category.name}
						resourceType="Question Category"
						// Update
						updateForm={(onSuccess) => (
							<UpdateQuestionCategoryForm
								category={category}
								onSuccess={onSuccess}
							/>
						)}
						// Delete
						onDelete={handleDeleteQuestionCategory}
						deleteLoading={deleteQuestionCategoryLoading}
					/>
				}
			></ListItemCollapsible>
		);
	}
);
// TODO: show the questions
