import {
	Box,
	CircularProgress,
	List,
	Typography,
	Tooltip,
	IconButton,
	Dialog
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { QuestionCategoryCollapsible } from 'domains/activity/components/QuestionCategoryCollapsible';
import { CreateQuestionCategoryForm } from 'domains/activity/components/QuestionCategoryForm/CreateQuestionCategoryForm';
import { Content } from 'domains/shared/components/layout/Content';
import { ContentHeader } from 'domains/shared/components/layout/ContentHeader';
import { MyHead } from 'domains/shared/components/MyHead';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import { useQuestionBankQuery } from 'generated/graphql';

export default function QuestionBank() {
	const questionBank = useQuestionBankQuery();

	const [
		isCreateQuestionCategoryDialogOpen,
		openCreateQuestionCategoryDialog,
		closeCreateQuestionCategoryDialog
	] = useBooleanState();

	return (
		<>
			<MyHead title="Question Bank" />
			<ContentHeader
				title="Question Bank"
				action={
					<Tooltip title="Create Question Category">
						<IconButton onClick={openCreateQuestionCategoryDialog}>
							<Add />
						</IconButton>
					</Tooltip>
				}
			/>

			{(() => {
				if (questionBank.loading || !questionBank.data) {
					return (
						<Box display="flex" justifyContent="center">
							<CircularProgress />
						</Box>
					);
				}

				if (!questionBank.data.questionBank.length) {
					return (
						<Box py={1} px={2}>
							<Typography color="textSecondary" align="center">
								There are no categories created yet
							</Typography>
						</Box>
					);
				}

				return (
					<List>
						{questionBank.data.questionBank.map((category) => (
							<QuestionCategoryCollapsible
								key={category.id}
								category={category}
							/>
						))}
					</List>
				);
			})()}

			<Dialog
				open={isCreateQuestionCategoryDialogOpen}
				onClose={closeCreateQuestionCategoryDialog}
				fullWidth
				maxWidth="xs"
			>
				<Content>
					<ContentHeader title="Create Question Category" />
					<CreateQuestionCategoryForm
						onSuccess={closeCreateQuestionCategoryDialog}
					/>
				</Content>
			</Dialog>
		</>
	);
}
