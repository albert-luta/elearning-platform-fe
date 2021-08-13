import { useReactiveVar } from '@apollo/client';
import { Box, Button, Typography } from '@material-ui/core';
import {
	quizQuestionIndexVar,
	quizQuestionsAnswersVar
} from 'domains/activity/reactiveVars';
import { UserQuizFieldsFragment } from 'generated/graphql';
import { FC, memo } from 'react';

export const QuizNavigation: FC<{ userQuiz: UserQuizFieldsFragment }> = memo(
	function QuizNavigation({ userQuiz }) {
		const quizQuestionsAnswers = useReactiveVar(quizQuestionsAnswersVar);

		return (
			<>
				<Typography variant="h5">Quiz Navigation</Typography>
				<Box
					mt={2}
					display="grid"
					gridGap={8}
					gridTemplateColumns="repeat(auto-fill, minmax(55px, 1fr))"
				>
					{userQuiz.questions.map((quizQuestion, i) => (
						<Button
							key={quizQuestion.id}
							variant={
								quizQuestionsAnswers?.[quizQuestion.id].length
									? 'contained'
									: 'outlined'
							}
							onClick={() => quizQuestionIndexVar(i)}
						>
							{i + 1}
						</Button>
					))}
				</Box>
			</>
		);
	}
);
