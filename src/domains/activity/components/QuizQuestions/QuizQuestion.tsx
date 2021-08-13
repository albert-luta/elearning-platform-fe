import { useReactiveVar } from '@apollo/client';
import { Delete } from '@material-ui/icons';
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	Radio,
	RadioGroup,
	Typography
} from '@material-ui/core';
import { quizQuestionsAnswersVar } from 'domains/activity/reactiveVars';
import {
	QuestionAnswerObject,
	QuestionType,
	UserQuizFieldsFragment
} from 'generated/graphql';
import { ChangeEvent, FC, memo, useCallback, useMemo } from 'react';

interface QuizQuestionProps {
	quizQuestion: UserQuizFieldsFragment['questions'][number];
}

export const QuizQuestion: FC<QuizQuestionProps> = memo(function QuizQuestion({
	quizQuestion: { id, question }
}) {
	const quizQuestionsAnswers = useReactiveVar(quizQuestionsAnswersVar);
	const updateQuizQuestionsAnswers = useCallback(
		(pickedAnswers: string[]) => {
			quizQuestionsAnswersVar({
				...quizQuestionsAnswersVar(),
				[id]: pickedAnswers
			});
		},
		[id]
	);

	return (
		<>
			<Typography>{question.text}</Typography>
			<Box mt={1}>
				<FormControl>
					{question.type === QuestionType.SingleChoice ? (
						<RadioAnswers
							answers={question.answers}
							pickedAnswers={quizQuestionsAnswers?.[id] ?? []}
							onPickedAnswersChange={updateQuizQuestionsAnswers}
						/>
					) : (
						<CheckboxAnswers
							answers={question.answers}
							pickedAnswers={quizQuestionsAnswers?.[id] ?? []}
							onPickedAnswersChange={updateQuizQuestionsAnswers}
						/>
					)}
				</FormControl>
			</Box>
		</>
	);
});

interface AnswersProps {
	answers: QuestionAnswerObject[];
	pickedAnswers: string[];
	onPickedAnswersChange: (updatedPickedAnswers: string[]) => void;
}
const CheckboxAnswers: FC<AnswersProps> = memo(function CheckboxAnswers({
	answers,
	pickedAnswers,
	onPickedAnswersChange
}) {
	const pickedAnswersMap = useMemo(
		() =>
			pickedAnswers.reduce<Record<string, true>>(
				(acc, curr) => ({ ...acc, [curr]: true }),
				{}
			),
		[pickedAnswers]
	);
	const updatePickedAnswers = useCallback(
		(e: ChangeEvent<HTMLInputElement>, answer: QuestionAnswerObject) => {
			if (e.target.checked) {
				onPickedAnswersChange([...pickedAnswers, answer.id]);
			} else {
				onPickedAnswersChange(
					pickedAnswers.filter((answerId) => answerId !== answer.id)
				);
			}
		},
		[pickedAnswers, onPickedAnswersChange]
	);

	return (
		<FormGroup>
			{answers.map((answer) => (
				<FormControlLabel
					key={answer.id}
					control={
						<Checkbox
							checked={!!pickedAnswersMap[answer.id]}
							onChange={(e) => updatePickedAnswers(e, answer)}
							name={answer.text}
							color="primary"
						/>
					}
					label={answer.text}
					labelPlacement="end"
				/>
			))}
		</FormGroup>
	);
});

const RadioAnswers: FC<AnswersProps> = memo(function RadioAnswers({
	answers,
	pickedAnswers,
	onPickedAnswersChange
}) {
	const updatePickedAnswer = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			onPickedAnswersChange([e.target.value]);
		},
		[onPickedAnswersChange]
	);
	const clearPickedAnswer = useCallback(() => {
		onPickedAnswersChange([]);
	}, [onPickedAnswersChange]);

	return (
		<>
			<RadioGroup
				value={pickedAnswers[0] ?? ''}
				onChange={updatePickedAnswer}
			>
				{answers.map((answer) => (
					<FormControlLabel
						key={answer.id}
						value={answer.id}
						control={<Radio color="primary" />}
						label={answer.text}
						labelPlacement="end"
					/>
				))}
			</RadioGroup>
			<Box mt={1}>
				<Button onClick={clearPickedAnswer} startIcon={<Delete />}>
					Clear Answer
				</Button>
			</Box>
		</>
	);
});
