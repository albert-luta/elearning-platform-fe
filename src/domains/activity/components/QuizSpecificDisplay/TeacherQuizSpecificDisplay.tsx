import { Box, Typography } from '@material-ui/core';
import { useCountdown } from 'domains/shared/hooks/useCountdown';
import { QuizObject } from 'generated/graphql';
import { FC, memo, useMemo } from 'react';
import { QuizStatus } from '../QuizStatus';

interface TeacherQuizSpecificDisplayProps {
	activity: QuizObject;
}

export const TeacherQuizSpecificDisplay: FC<TeacherQuizSpecificDisplayProps> = memo(
	function TeacherQuizSpecificDisplay({ activity }) {
		const maxGrade = useMemo(
			() =>
				activity.quizQuestions.reduce(
					(acc, { maxGrade }) => acc + maxGrade,
					0
				),
			[activity.quizQuestions]
		);

		const timeOpen = new Date(activity.timeOpen);
		const timeOpenCountdown = useCountdown(timeOpen.getTime());

		const timeClose = new Date(activity.timeClose);
		const timeCloseCountdown = useCountdown(timeClose.getTime());

		return (
			<>
				<Typography variant="h5">Quiz details</Typography>
				<Box mt={2}>
					<QuizStatus
						type="teacher"
						maxGrade={maxGrade}
						timeOpen={timeOpen}
						timeOpenCountdown={timeOpenCountdown}
						timeClose={timeClose}
						timeCloseCountdown={timeCloseCountdown}
						timeLimit={activity.timeLimit}
						shuffleQuestions={activity.shuffleQuestions}
						shuffleAnswers={activity.shuffleAnswers}
						quizQuestions={activity.quizQuestions}
					/>
				</Box>
				{/* TODO: add student here - can redirect to the review page */}
				{/* <Box mt={2}>
					<Typography variant="h5">Students</Typography>
				</Box> */}
			</>
		);
	}
);
