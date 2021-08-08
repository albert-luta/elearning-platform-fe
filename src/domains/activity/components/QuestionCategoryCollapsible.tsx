import { Box, Typography } from '@material-ui/core';
import { AddButton } from 'domains/shared/components/buttons/AddButton';
import { ListItemCollapsible } from 'domains/shared/components/list/ListItemCollapsible';
import { ModifyResourceAction } from 'domains/shared/components/ModifyResourceAction';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import {
	QuestionCategoryObject,
	useDeleteQuestionCategoryMutation,
	useDeleteQuestionMutation
} from 'generated/graphql';
import { FC, memo, useCallback } from 'react';
import { deleteQuestionCategoryUpdate } from '../graphql/updates/deleteQuestionCategoryUpdate';
import { deleteQuestionUpdate } from '../graphql/updates/deleteQuestionUpdate';
import { UpdateQuestionCategoryForm } from './QuestionCategoryForm/UpdateQuestionCategoryForm';
import { CreateQuestionForm } from './QuestionForm/CreateQuestionForm';
import { UpdateQuestionForm } from './QuestionForm/UpdateQuestionForm';
import { QuestionIcon } from './QuestionIcon';

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

		const [
			deleteQuestion,
			{ loading: deleteQuestionLoading }
		] = useDeleteQuestionMutation({
			update: deleteQuestionUpdate(category.id)
		});

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
			>
				<Box pb={0.5}>
					<AddButton
						fullWidth
						resourceType="Question Category"
						form={(onSuccess) => (
							<CreateQuestionForm
								categoryId={category.id}
								onSuccess={onSuccess}
							/>
						)}
					/>
				</Box>
				{category.questions.length ? (
					category.questions.map((question) => (
						<Box
							key={question.id}
							display="flex"
							alignItems="center"
						>
							<Box
								width="100%"
								display="flex"
								alignItems="center"
							>
								<Box
									pr={1.5}
									display="flex"
									alignItems="center"
								>
									<QuestionIcon type={question.type} />
								</Box>
								<Typography>{question.name}</Typography>
							</Box>
							<ModifyResourceAction
								// Shared
								resourceName={question.name}
								resourceType="Question"
								// Update
								updateForm={(onSuccess) => (
									<UpdateQuestionForm
										question={question}
										onSuccess={onSuccess}
									/>
								)}
								// Delete
								onDelete={() => {
									deleteQuestion({
										variables: {
											id: question.id
										}
									}).catch(() => null);
								}}
								deleteLoading={deleteQuestionLoading}
							/>
						</Box>
					))
				) : (
					<Typography color="textSecondary" align="center">
						There are no questions created yet
					</Typography>
				)}
			</ListItemCollapsible>
		);
	}
);
