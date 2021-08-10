import { Box, Button } from '@material-ui/core';
import { DataGrid, GridColDef, GridRowId } from '@material-ui/data-grid';
import {
	QuestionObject,
	QuestionType,
	useQuestionBankQuery
} from 'generated/graphql';
import { FC, memo, useCallback, useMemo, useState } from 'react';
import { CreateQuizQuestion } from './QuizForm';

const humanizeType = (type: QuestionType): string => {
	switch (type) {
		case QuestionType.SingleChoice:
			return 'Single Choice';
		case QuestionType.MultipleChoice:
		default:
			return 'Multiple Choice';
	}
};

const columns: GridColDef[] = [
	{
		field: 'category',
		headerName: 'Category',
		width: 225
	},
	{
		field: 'type',
		headerName: 'Type',
		width: 150
	},
	{
		field: 'name',
		headerName: 'Name',
		flex: 1
	}
];

interface QuestionsPickerProps {
	picked: CreateQuizQuestion[];
	onPick: (questions: CreateQuizQuestion[]) => void;
}

export const QuestionsPicker: FC<QuestionsPickerProps> = memo(
	function QuestionsPicker({ onPick, picked }) {
		const questionBank = useQuestionBankQuery();
		const questionsMap = useMemo(
			() =>
				questionBank.data?.questionBank.reduce<
					Record<string, QuestionObject>
				>(
					(acc, currCategory) => ({
						...acc,
						...currCategory.questions.reduce<
							Record<string, QuestionObject>
						>(
							(accQuestions, currQuestion) => ({
								...accQuestions,
								[currQuestion.id]: {
									...currQuestion,
									category: currCategory.name
								}
							}),
							{}
						)
					}),
					{}
				) ?? {},
			[questionBank.data?.questionBank]
		);

		const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);
		const pickQuestions = useCallback((): void => {
			onPick(
				selectionModel.map((questionId) => {
					const { id, name, type } = questionsMap[questionId];

					return {
						id,
						name,
						type,
						maxGrade: 0
					};
				})
			);
		}, [selectionModel, onPick, questionsMap]);

		const questionsFlat = useMemo(() => {
			const filteredQuestionsMap = { ...questionsMap };
			picked.forEach(({ id }) => {
				delete filteredQuestionsMap[id];
			});

			return Object.values(filteredQuestionsMap).map((question) => ({
				...question,
				type: humanizeType(question.type)
			}));
		}, [picked, questionsMap]);

		return (
			<>
				<DataGrid
					columns={columns}
					autoHeight
					checkboxSelection
					disableSelectionOnClick
					autoPageSize
					selectionModel={selectionModel}
					onSelectionModelChange={setSelectionModel}
					loading={questionBank.loading}
					rows={questionsFlat}
				/>
				{!questionBank.loading && (
					<Box mt={3}>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							onClick={pickQuestions}
						>
							Add
						</Button>
					</Box>
				)}
			</>
		);
	}
);
