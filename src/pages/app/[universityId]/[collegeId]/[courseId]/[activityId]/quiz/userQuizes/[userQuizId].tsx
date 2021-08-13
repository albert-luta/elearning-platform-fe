import { Box, CircularProgress, Typography } from '@material-ui/core';
import { QuizQuestionsList } from 'domains/activity/components/QuizQuestions/QuizQuestionsList';
import { MyHead } from 'domains/shared/components/MyHead';
import { Routes } from 'domains/shared/constants/Routes';
import { composeDynamicRoute } from 'domains/shared/utils/route/composeDynamicRoute';
import { useActivityQuery, useUserQuizAttemptQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function QuizTeacherReview() {
	const router = useRouter();
	const userQuiz = useUserQuizAttemptQuery({
		variables: {
			id: String(router.query.userQuizId)
		}
	});
	const quiz = useActivityQuery({
		variables: {
			id: String(router.query.activityId)
		}
	});

	useEffect(() => {
		if (!userQuiz.loading && !userQuiz.data?.userQuizAttempt) {
			router.replace(
				composeDynamicRoute(Routes.activity.QUIZ_DASHBOARD.path, {
					universityId: String(router.query.universityId),
					collegeId: String(router.query.collegeId),
					courseId: String(router.query.courseId),
					activityId: String(router.query.activityId)
				})
			);
		}
	}, [userQuiz.data?.userQuizAttempt, userQuiz.loading, router]);

	return (
		<>
			<MyHead title="Quiz" />

			{(() => {
				if (userQuiz.loading || quiz.loading) {
					return (
						<Box display="flex" justifyContent="center">
							<CircularProgress />
						</Box>
					);
				}

				if (
					!userQuiz.data?.userQuizAttempt ||
					!quiz.data ||
					quiz.data.activity.__typename !== 'QuizObject'
				) {
					return (
						<Typography color="textSecondary" align="center">
							There was a problem finding user&quot;s quiz,
							you&quot;ll be redirected
						</Typography>
					);
				}

				return (
					<QuizQuestionsList
						quiz={quiz.data.activity}
						userQuiz={userQuiz.data.userQuizAttempt}
						disabled
					/>
				);
			})()}
		</>
	);
}
