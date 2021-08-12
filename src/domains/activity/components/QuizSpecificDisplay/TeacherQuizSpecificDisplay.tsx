import { Box, CircularProgress, Typography } from '@material-ui/core';
import { useCountdown } from 'domains/shared/hooks/useCountdown';
import { QuizObject, useUserQuizAttemptsQuery } from 'generated/graphql';
import { FC, memo, useMemo } from 'react';
import { QuizStatus } from '../QuizStatus';
import { StudentQuizButton } from './StudentQuizButton';

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

		const userQuizAttempts = useUserQuizAttemptsQuery({
			variables: {
				quizId: activity.id
			}
		});

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
				<Box mt={2}>
					<Typography variant="h5">Students</Typography>
				</Box>
				<Box mt={2}>
					{userQuizAttempts.loading ? (
						<Box display="flex" justifyContent="center">
							<CircularProgress />
						</Box>
					) : (
						<>
							{userQuizAttempts.data?.userQuizAttempts.length ? (
								userQuizAttempts.data.userQuizAttempts.map(
									(userQuizAttempt) => (
										<StudentQuizButton
											key={userQuizAttempt.id}
											userQuizAttempt={userQuizAttempt}
											maxGrade={maxGrade}
										/>
									)
								)
							) : (
								<Typography color="textSecondary">
									There are no attempts for this quiz
								</Typography>
							)}
						</>
					)}
				</Box>
			</>
		);
	}
);
