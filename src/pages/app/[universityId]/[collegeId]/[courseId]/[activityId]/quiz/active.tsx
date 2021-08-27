import { Box, CircularProgress, Typography } from '@material-ui/core';
import { QuizQuestionsList } from 'domains/activity/components/QuizQuestions/QuizQuestionsList';
import { MyHead } from 'domains/shared/components/MyHead';
import { Routes } from 'domains/shared/constants/Routes';
import { composeDynamicRoute } from 'domains/shared/utils/route/composeDynamicRoute';
import { useActivityQuery, useMyQuizQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function QuizActive() {
	const router = useRouter();
	const myQuiz = useMyQuizQuery({
		variables: {
			quizId: String(router.query.activityId)
		}
	});
	const quiz = useActivityQuery({
		variables: {
			id: String(router.query.activityId)
		}
	});

	useEffect(() => {
		if (!myQuiz.loading && !myQuiz.data?.myQuiz) {
			router.replace(
				composeDynamicRoute(Routes.activity.QUIZ_DASHBOARD.path, {
					universityId: String(router.query.universityId),
					collegeId: String(router.query.collegeId),
					courseId: String(router.query.courseId),
					activityId: String(router.query.activityId)
				})
			);
		}
	}, [myQuiz.data?.myQuiz, myQuiz.loading, router]);

	return (
		<>
			<MyHead title="Quiz" />

			{(() => {
				if (myQuiz.loading || quiz.loading) {
					return (
						<Box display="flex" justifyContent="center">
							<CircularProgress />
						</Box>
					);
				}

				if (
					!myQuiz.data?.myQuiz ||
					!quiz.data ||
					quiz.data.activity.__typename !== 'QuizObject'
				) {
					return (
						<Typography color="textSecondary" align="center">
							There was a problem finding your quiz, you&quot;ll
							be redirected
						</Typography>
					);
				}

				return (
					<QuizQuestionsList
						quiz={quiz.data.activity}
						userQuiz={myQuiz.data.myQuiz}
					/>
				);
			})()}
		</>
	);
}

// TODO: show the prevent exit dialog - you may lose all your progress
