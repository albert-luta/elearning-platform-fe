import { useReactiveVar } from '@apollo/client';
import { Box, Button, Typography } from '@material-ui/core';
import { ArrowBack, ArrowForward, Publish } from '@material-ui/icons';
import {
	quizQuestionIndexVar,
	quizQuestionsAnswersVar
} from 'domains/activity/reactiveVars';
import { AreYouSureDialog } from 'domains/shared/components/AreYouSureDialog';
import { Routes } from 'domains/shared/constants/Routes';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import { useCountdown } from 'domains/shared/hooks/useCountdown';
import { formatDuration } from 'domains/shared/utils/formatDuration';
import { composeDynamicRoute } from 'domains/shared/utils/route/composeDynamicRoute';
import {
	QuizObject,
	UserQuizFieldsFragment,
	useSubmitMyQuizMutation,
	useUpdateQuestionAnswersMutation
} from 'generated/graphql';
import { useRouter } from 'next/router';
import { FC, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { QuizQuestion } from './QuizQuestion';

const MINUTE_MILLISECONDS = 1000 * 60;

interface QuizQuestionsListProps {
	quiz: QuizObject;
	userQuiz: UserQuizFieldsFragment;
}

export const QuizQuestionsList: FC<QuizQuestionsListProps> = memo(
	function QuizQuestionsList({ quiz, userQuiz }) {
		useEffect(() => {
			if (quizQuestionsAnswersVar() == null) {
				quizQuestionsAnswersVar(
					userQuiz.questions.reduce<Record<string, string[]>>(
						(acc, { id, pickedAnswers }) => ({
							...acc,
							[id]: pickedAnswers.map(
								({ questionAnswerId }) => questionAnswerId
							)
						}),
						{}
					)
				);
			}
		}, [userQuiz.questions]);

		const router = useRouter();
		const timeStartPlusLimit = useMemo(
			() => new Date(userQuiz.timeStart).getTime() + quiz.timeLimit,
			[quiz.timeLimit, userQuiz.timeStart]
		);
		const timeClose = useMemo(() => new Date(quiz.timeClose).getTime(), [
			quiz.timeClose
		]);
		const timeFinishCountdown = useCountdown(
			Math.min(timeStartPlusLimit, timeClose)
		);

		const redirectToQuizDashboard = useCallback((): void => {
			router.replace(
				composeDynamicRoute(Routes.activity.QUIZ_DASHBOARD.path, {
					universityId: String(router.query.universityId),
					collegeId: String(router.query.collegeId),
					courseId: String(router.query.courseId),
					activityId: String(router.query.activityId)
				})
			);
		}, [router]);

		useEffect(() => {
			if (userQuiz.timeFinish != null) {
				redirectToQuizDashboard();
			}
		}, [userQuiz.timeFinish, redirectToQuizDashboard]);

		const [
			submitMyQuiz,
			{ loading: submitMyQuizLoading }
		] = useSubmitMyQuizMutation();
		const handleSubmitMyQuiz = useCallback((): void => {
			submitMyQuiz({
				variables: {
					id: userQuiz.id,
					data: {
						questions: Object.entries(
							quizQuestionsAnswersVar() ?? {}
						).map(([userQuizQuestionId, answers]) => ({
							userQuizQuestionId,
							answers
						}))
					}
				}
			})
				.catch(() => null)
				.finally(() => {
					redirectToQuizDashboard();
				});
		}, [submitMyQuiz, userQuiz.id, redirectToQuizDashboard]);

		useEffect(() => {
			if (
				userQuiz.timeFinish == null &&
				timeFinishCountdown.hasCompleted &&
				quizQuestionsAnswersVar() != null
			) {
				handleSubmitMyQuiz();
			}
		}, [
			userQuiz.timeFinish,
			timeFinishCountdown.hasCompleted,
			handleSubmitMyQuiz
		]);

		useEffect(
			() => () => {
				quizQuestionIndexVar(0);
				quizQuestionsAnswersVar(null);
			},
			[]
		);

		const quizQuestionIndex = useReactiveVar(quizQuestionIndexVar);
		const questionMaxGrade = useMemo(
			() =>
				quiz.quizQuestions.find(
					({ questionId }) =>
						questionId ===
						userQuiz.questions[quizQuestionIndex].question.id
				)?.maxGrade ?? 0,
			[quiz.quizQuestions, quizQuestionIndex, userQuiz.questions]
		);

		const goToPreviousQuestion = useCallback(() => {
			const updatedIndex = quizQuestionIndexVar() - 1;
			if (updatedIndex < 0) {
				quizQuestionIndexVar(0);
			} else {
				quizQuestionIndexVar(updatedIndex);
			}
		}, []);
		const goToNextQuestion = useCallback(() => {
			const updatedIndex = quizQuestionIndexVar() + 1;
			if (updatedIndex > userQuiz.questions.length - 1) {
				quizQuestionIndexVar(userQuiz.questions.length - 1);
			} else {
				quizQuestionIndexVar(updatedIndex);
			}
		}, [userQuiz.questions.length]);

		const [
			isSubmitDialogOpen,
			openSubmitDialog,
			closeSubmitDialog
		] = useBooleanState();
		const handleSubmitAnswer = useCallback(
			(answer: boolean): void => {
				if (!answer) {
					closeSubmitDialog();
					return;
				}

				handleSubmitMyQuiz();
			},
			[closeSubmitDialog, handleSubmitMyQuiz]
		);

		const previousQuizQuestionIndex = useRef(0);
		const [
			updateQuestionAnswers,
			{ loading: updateQuestionAnswersLoading }
		] = useUpdateQuestionAnswersMutation();
		useEffect(() => {
			if (userQuiz.timeFinish != null) return;
			if (timeFinishCountdown.hasCompleted) return;
			if (quizQuestionIndex === previousQuizQuestionIndex.current) return;
			if (updateQuestionAnswersLoading) return;

			const userQuizQuestionId =
				userQuiz.questions[previousQuizQuestionIndex.current].id;
			updateQuestionAnswers({
				variables: {
					userQuizQuestionId,
					answers:
						quizQuestionsAnswersVar()?.[userQuizQuestionId] ?? []
				}
			})
				.catch(() => null)
				.finally(() => {
					previousQuizQuestionIndex.current = quizQuestionIndex;
				});
		}, [
			userQuiz.timeFinish,
			quizQuestionIndex,
			updateQuestionAnswers,
			userQuiz.questions,
			timeFinishCountdown.hasCompleted,
			updateQuestionAnswersLoading
		]);

		return (
			<>
				<Box display="flex" justifyContent="space-between">
					<div>
						<Typography variant="h5">
							Question: {quizQuestionIndex + 1} /{' '}
							{userQuiz.questions.length}
						</Typography>
						<Typography>Max Grade: {questionMaxGrade}</Typography>
					</div>

					<Typography
						variant="h5"
						align="right"
						color={
							timeFinishCountdown.duration >
							5 * MINUTE_MILLISECONDS
								? 'initial'
								: 'secondary'
						}
					>
						{formatDuration(timeFinishCountdown.duration, 'clock')}
					</Typography>
				</Box>

				<Box mt={2}>
					<QuizQuestion
						quizQuestion={userQuiz.questions[quizQuestionIndex]}
					/>
				</Box>

				<Box mt={2} display="flex" justifyContent="space-between">
					{quizQuestionIndex ? (
						<Button
							variant="contained"
							color="primary"
							startIcon={<ArrowBack />}
							onClick={goToPreviousQuestion}
						>
							Previous
						</Button>
					) : (
						<div />
					)}
					{quizQuestionIndex < userQuiz.questions.length - 1 ? (
						<Button
							variant="contained"
							color="primary"
							endIcon={<ArrowForward />}
							onClick={goToNextQuestion}
						>
							Next
						</Button>
					) : (
						<Button
							variant="contained"
							color="secondary"
							endIcon={<Publish />}
							onClick={openSubmitDialog}
						>
							Submit
						</Button>
					)}
				</Box>

				<AreYouSureDialog
					title="submit the quiz"
					subtitle="You will not be able to go back and change something later!"
					open={isSubmitDialogOpen}
					onAnswer={handleSubmitAnswer}
					loading={submitMyQuizLoading}
				/>
			</>
		);
	}
);
