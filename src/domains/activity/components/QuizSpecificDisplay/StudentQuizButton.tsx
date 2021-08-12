import { ButtonLink } from 'domains/shared/components/buttons/ButtonLink';
import { Routes } from 'domains/shared/constants/Routes';
import { composeDynamicRoute } from 'domains/shared/utils/route/composeDynamicRoute';
import { UserQuizAttemptsQuery } from 'generated/graphql';
import { Box, Hidden, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { FC, memo, useMemo } from 'react';
import { MyAvatar } from 'domains/shared/components/MyAvatar';

interface StudentQuizButtonProps {
	userQuizAttempt: UserQuizAttemptsQuery['userQuizAttempts'][number];
	maxGrade: number;
}

export const StudentQuizButton: FC<StudentQuizButtonProps> = memo(
	function StudentQuizButton({ userQuizAttempt, maxGrade }) {
		const router = useRouter();

		const grade = useMemo(() => {
			if (!userQuizAttempt.timeFinish) {
				return null;
			}

			return userQuizAttempt.questions.reduce<number | null>(
				(acc, { grade }) =>
					acc == null || grade == null ? null : acc + grade,
				0
			);
		}, [userQuizAttempt.timeFinish, userQuizAttempt.questions]);

		return (
			<ButtonLink
				fullWidth
				style={{ textTransform: 'none' }}
				href={composeDynamicRoute(
					Routes.activity.QUIZ_TEACHER_REVIEW.path,
					{
						universityId: String(router.query.universityId),
						collegeId: String(router.query.collegeId),
						courseId: String(router.query.courseId),
						activityId: String(router.query.activityId),
						userQuizId: userQuizAttempt.id
					}
				)}
			>
				<Box
					width="100%"
					display="flex"
					alignItems="center"
					justifyContent="space-between"
				>
					<Box display="flex" alignItems="center" pr={2}>
						<Box pr={2}>
							<MyAvatar
								src={userQuizAttempt.user.avatar}
								alt={`${userQuizAttempt.user.firstName} ${userQuizAttempt.user.lastName}`}
							/>
						</Box>
						<Typography>
							{grade ?? 'Not graded yet'} / {maxGrade}
							<Box component="span" px={2}>
								-
							</Box>
							{userQuizAttempt.user.firstName}{' '}
							{userQuizAttempt.user.fatherInitial}.{' '}
							{userQuizAttempt.user.lastName}
						</Typography>
					</Box>
					<Hidden mdDown>
						<Typography>
							{new Date(
								userQuizAttempt.timeStart
							).toLocaleString()}{' '}
							-{' '}
							{userQuizAttempt.timeFinish
								? new Date(
										userQuizAttempt.timeFinish
								  ).toLocaleString()
								: 'Not finished yet'}
						</Typography>
					</Hidden>
				</Box>
			</ButtonLink>
		);
	}
);
