import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { ButtonWithLoader } from 'domains/shared/components/buttons/ButtonWithLoader';
import { Routes } from 'domains/shared/constants/Routes';
import { useCountdown } from 'domains/shared/hooks/useCountdown';
import { composeDynamicRoute } from 'domains/shared/utils/route/composeDynamicRoute';
import {
	MyQuizDocument,
	QuizObject,
	useCreateQuizAttemptMutation,
	useMyQuizQuery
} from 'generated/graphql';
import { useRouter } from 'next/router';
import { FC, memo, useCallback, useMemo } from 'react';
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

		const myQuiz = useMyQuizQuery({
			variables: {
				quizId: activity.id
			}
		});

		const grade = useMemo(() => {
			if (!timeCloseCountdown.hasCompleted || !myQuiz.data?.myQuiz) {
				return null;
			}

			return myQuiz.data.myQuiz.questions.reduce<number | null>(
				(acc, { grade }) =>
					acc == null || grade == null ? null : acc + grade,
				0
			);
		}, [myQuiz.data?.myQuiz, timeCloseCountdown.hasCompleted]);

		const router = useRouter();
		const routeIdentification = useMemo(
			() => ({
				universityId: String(router.query.universityId),
				collegeId: String(router.query.collegeId),
				courseId: String(router.query.courseId),
				activityId: String(router.query.activityId)
			}),
			[
				router.query.universityId,
				router.query.collegeId,
				router.query.courseId,
				router.query.activityId
			]
		);
		const reviewAttempt = useCallback((): void => {
			router.push(
				composeDynamicRoute(
					Routes.activity.QUIZ_STUDENT_REVIEW.path,
					routeIdentification
				)
			);
		}, [router, routeIdentification]);
		const continueAttempt = useCallback((): void => {
			router.push(
				composeDynamicRoute(
					Routes.activity.QUIZ_ACTIVE.path,
					routeIdentification
				)
			);
		}, [router, routeIdentification]);
		const [
			createQuizAttempt,
			{ loading: beginAttemptLoading }
		] = useCreateQuizAttemptMutation();
		const beginAttempt = useCallback(async (): Promise<void> => {
			await createQuizAttempt({
				variables: {
					quizId: activity.id
				},
				refetchQueries: [
					{
						query: MyQuizDocument,
						variables: {
							quizId: activity.id
						}
					}
				]
			}).catch(() => null);
			continueAttempt();
		}, [createQuizAttempt, activity.id, continueAttempt]);

		if (myQuiz.loading) {
			return (
				<Box display="flex" justifyContent="center">
					<CircularProgress />
				</Box>
			);
		}

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
						grade={grade}
						timeStart={
							myQuiz.data?.myQuiz?.timeStart
								? new Date(myQuiz.data?.myQuiz?.timeStart)
								: null
						}
						timeFinish={
							myQuiz.data?.myQuiz?.timeFinish
								? new Date(myQuiz.data?.myQuiz?.timeFinish)
								: null
						}
					/>
				</Box>
				{timeCloseCountdown.hasCompleted && myQuiz.data?.myQuiz && (
					<Box mt={2}>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							onClick={reviewAttempt}
						>
							Review Attempt
						</Button>
					</Box>
				)}
				{timeOpenCountdown.hasCompleted &&
					!timeCloseCountdown.hasCompleted && (
						<Box mt={2}>
							{myQuiz.data?.myQuiz ? (
								<Button
									variant="contained"
									color="primary"
									fullWidth
									onClick={continueAttempt}
								>
									Continue Attempt
								</Button>
							) : (
								<ButtonWithLoader
									variant="contained"
									color="primary"
									fullWidth
									onClick={beginAttempt}
									loading={beginAttemptLoading}
								>
									Begin Attempt
								</ButtonWithLoader>
							)}
						</Box>
					)}
			</>
		);
	}
);
