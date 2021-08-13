import { Box, CircularProgress } from '@material-ui/core';
import { QuizNavigation } from 'domains/activity/components/QuizQuestions/QuizNavigation';
import { UserActivityReviewInfo } from 'domains/activity/components/UserActivityReviewInfo';
import { useUserQuizAttemptQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import { FC, memo } from 'react';

export const QuizTeacherReview: FC = memo(function QuizTeacherReview() {
	const router = useRouter();
	const userQuiz = useUserQuizAttemptQuery({
		variables: {
			id: String(router.query.userQuizId)
		}
	});

	if (userQuiz.loading || !userQuiz.data?.userQuizAttempt) {
		return (
			<Box display="flex" justifyContent="center">
				<CircularProgress />
			</Box>
		);
	}

	return (
		<>
			<UserActivityReviewInfo user={userQuiz.data.userQuizAttempt.user} />
			<Box mt={2}>
				<QuizNavigation userQuiz={userQuiz.data.userQuizAttempt} />
			</Box>
		</>
	);
});
