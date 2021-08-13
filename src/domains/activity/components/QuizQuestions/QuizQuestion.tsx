import { useReactiveVar } from '@apollo/client';
import { ArrowRight, Delete } from '@material-ui/icons';
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
	disabled?: boolean;
}

export const QuizQuestion: FC<QuizQuestionProps> = memo(function QuizQuestion({
	quizQuestion: { id, question },
	disabled = false
}) {
	const quizQuestionsAnswers = useReactiveVar(quizQuestionsAnswersVar);
	const updateQuizQuestionsAnswers = useCallback(
		(pickedAnswers: string[]) => {
			if (disabled) return;

			quizQuestionsAnswersVar({
				...quizQuestionsAnswersVar(),
				[id]: pickedAnswers
			});
		},
		[disabled, id]
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
							disabled={disabled}
						/>
					) : (
						<CheckboxAnswers
							answers={question.answers}
							pickedAnswers={quizQuestionsAnswers?.[id] ?? []}
							onPickedAnswersChange={updateQuizQuestionsAnswers}
							disabled={disabled}
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
	disabled?: boolean;
}
const CheckboxAnswers: FC<AnswersProps> = memo(function CheckboxAnswers({
	answers,
	pickedAnswers,
	onPickedAnswersChange,
	disabled = false
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
		(
			e: ChangeEvent<HTMLInputElement>,
			answer: QuestionAnswerObject
		): void => {
			if (disabled) return;

			if (e.target.checked) {
				onPickedAnswersChange([...pickedAnswers, answer.id]);
			} else {
				onPickedAnswersChange(
					pickedAnswers.filter((answerId) => answerId !== answer.id)
				);
			}
		},
		[disabled, pickedAnswers, onPickedAnswersChange]
	);

	return (
		<FormGroup>
			{answers.map((answer) => (
				<Box key={answer.id} display="flex" alignItems="center">
					{disabled && (
						<AnswerCorrectIcon isCorrect={answer.fraction > 0} />
					)}
					<FormControlLabel
						control={
							<Checkbox
								checked={!!pickedAnswersMap[answer.id]}
								onChange={(e) => updatePickedAnswers(e, answer)}
								name={answer.text}
								color="primary"
								disabled={disabled}
							/>
						}
						label={answer.text}
						labelPlacement="end"
					/>
				</Box>
			))}
		</FormGroup>
	);
});

const RadioAnswers: FC<AnswersProps> = memo(function RadioAnswers({
	answers,
	pickedAnswers,
	onPickedAnswersChange,
	disabled = false
}) {
	const updatePickedAnswer = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			if (disabled) return;

			onPickedAnswersChange([e.target.value]);
		},
		[disabled, onPickedAnswersChange]
	);
	const clearPickedAnswer = useCallback(() => {
		if (disabled) return;

		onPickedAnswersChange([]);
	}, [disabled, onPickedAnswersChange]);

	return (
		<>
			<RadioGroup
				value={pickedAnswers[0] ?? ''}
				onChange={updatePickedAnswer}
			>
				{answers.map((answer) => (
					<Box key={answer.id} display="flex" alignItems="center">
						{disabled && (
							<AnswerCorrectIcon
								isCorrect={answer.fraction > 0}
							/>
						)}
						<FormControlLabel
							value={answer.id}
							control={
								<Radio color="primary" disabled={disabled} />
							}
							label={answer.text}
							labelPlacement="end"
						/>
					</Box>
				))}
			</RadioGroup>
			{!disabled && (
				<Box mt={1}>
					<Button onClick={clearPickedAnswer} startIcon={<Delete />}>
						Clear Answer
					</Button>
				</Box>
			)}
		</>
	);
});

const AnswerCorrectIcon: FC<{ isCorrect: boolean }> = memo(
	function AnswerCorrectIcon({ isCorrect }) {
		return (
			<ArrowRight
				fontSize="large"
				style={{
					color: isCorrect ? '#388e3c' : '#d32f2f'
				}}
			/>
		);
	}
);
