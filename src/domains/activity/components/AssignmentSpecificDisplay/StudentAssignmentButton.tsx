import { ButtonLink } from 'domains/shared/components/buttons/ButtonLink';
import { useRouter } from 'next/router';
import { MyAvatar } from 'domains/shared/components/MyAvatar';
import { Routes } from 'domains/shared/constants/Routes';
import { composeDynamicRoute } from 'domains/shared/utils/route/composeDynamicRoute';
import { FC, memo } from 'react';
import { Box, Hidden, Typography } from '@material-ui/core';
import { UserAssignmentQuery } from 'generated/graphql';

interface StudentAssignmentButtonProps {
	userAssignment: NonNullable<UserAssignmentQuery['userAssignment']>;
	maxGrade: number;
}

export const StudentAssignmentButton: FC<StudentAssignmentButtonProps> = memo(
	function StudentAssignmentButton({ userAssignment, maxGrade }) {
		const router = useRouter();

		return (
			<Box key={userAssignment.id}>
				<ButtonLink
					fullWidth
					style={{ textTransform: 'none' }}
					href={composeDynamicRoute(
						Routes.activity.ASSIGNMENT_REVIEW.path,
						{
							universityId: String(router.query.universityId),
							collegeId: String(router.query.collegeId),
							courseId: String(router.query.courseId),
							activityId: String(router.query.activityId),
							userAssignmentId: userAssignment.id
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
									src={userAssignment.user.avatar}
									alt={`${userAssignment.user.firstName} ${userAssignment.user.lastName}`}
								/>
							</Box>
							<Typography>
								{userAssignment.grade ?? 'Not graded yet'} /{' '}
								{maxGrade}
								<Box component="span" px={2}>
									-
								</Box>
								{userAssignment.user.firstName}{' '}
								{userAssignment.user.fatherInitial}.{' '}
								{userAssignment.user.lastName}
							</Typography>
						</Box>
						<Hidden smDown>
							<Typography>
								{new Date(
									userAssignment.updatedAt
								).toLocaleString()}
							</Typography>
						</Hidden>
					</Box>
				</ButtonLink>
			</Box>
		);
	}
);
