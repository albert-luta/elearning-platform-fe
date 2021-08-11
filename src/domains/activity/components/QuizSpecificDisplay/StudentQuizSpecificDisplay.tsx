import { Box, Typography } from '@material-ui/core';
import { useCountdown } from 'domains/shared/hooks/useCountdown';
import { QuizObject } from 'generated/graphql';
import { FC, memo, useMemo } from 'react';
import { QuizStatus } from '../QuizStatus';

interface StudentQuizSpecificDisplayProps {
	activity: QuizObject;
}

export const StudentQuizSpecificDisplay: FC<StudentQuizSpecificDisplayProps> = memo(
	function StudentQuizSpecificDisplay({ activity }) {
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
				<Typography variant="h5">Quiz status</Typography>
				<Box mt={2}>
					<QuizStatus
						type="student"
						maxGrade={maxGrade}
						timeOpen={timeOpen}
						timeOpenCountdown={timeOpenCountdown}
						timeClose={timeClose}
						timeCloseCountdown={timeCloseCountdown}
						timeLimit={activity.timeLimit}
						// TODO: compute user grade
						grade={null}
					/>
				</Box>
				{/* TODO: add begin/continue attempt - or - review of the attempt(if timeClose >= Date.now()) */}
			</>
		);
	}
);
