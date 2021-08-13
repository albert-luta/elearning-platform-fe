import { Box, CircularProgress } from '@material-ui/core';
import { QuizNavigation } from 'domains/activity/components/QuizQuestions/QuizNavigation';
import { useMyQuizQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import { FC, memo } from 'react';

export const QuizActive: FC = memo(function QuizActive() {
	const router = useRouter();
	const myQuiz = useMyQuizQuery({
		variables: {
			quizId: String(router.query.activityId)
		}
	});

	if (myQuiz.loading || !myQuiz.data?.myQuiz) {
		return (
			<Box display="flex" justifyContent="center">
				<CircularProgress />
			</Box>
		);
	}

	return <QuizNavigation userQuiz={myQuiz.data.myQuiz} />;
});
