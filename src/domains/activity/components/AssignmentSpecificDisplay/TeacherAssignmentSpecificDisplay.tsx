import { Box, CircularProgress, Hidden, Typography } from '@material-ui/core';
import { ButtonLink } from 'domains/shared/components/buttons/ButtonLink';
import { MyAvatar } from 'domains/shared/components/MyAvatar';
import { Routes } from 'domains/shared/constants/Routes';
import { useCountdown } from 'domains/shared/hooks/useCountdown';
import { composeDynamicRoute } from 'domains/shared/utils/route/composeDynamicRoute';
import { AssignmentObject, useUserAssignmentsQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import { FC, memo } from 'react';
import { AssignmentStatus } from '../AssignmentStatus';

interface TeacherAssignmentSpecificDisplayProps {
	activity: AssignmentObject;
}

export const TeacherAssignmentSpecificDisplay: FC<TeacherAssignmentSpecificDisplayProps> = memo(
	function TeacherAssignmentSpecificDisplay({ activity }) {
		const router = useRouter();
		const userAssignments = useUserAssignmentsQuery({
			variables: { assignmentId: activity.id }
		});

		const deadline = new Date(activity.deadline);
		const deadlineCountdown = useCountdown(deadline.getTime());

		if (userAssignments.loading || !userAssignments.data) {
			return (
				<Box display="flex" justifyContent="center">
					<CircularProgress />
				</Box>
			);
		}

		return (
			<>
				<Typography variant="h5">Assignment details</Typography>
				<Box mt={2}>
					<AssignmentStatus
						type="general"
						maxGrade={activity.maxGrade}
						deadline={deadline}
						deadlineCountdown={deadlineCountdown}
					/>
				</Box>

				<Box mt={2}>
					<Typography variant="h5">Students</Typography>
				</Box>
				<Box mt={2}>
					{userAssignments.data.userAssignments.map(
						(userAssignment) => (
							<Box key={userAssignment.id}>
								<ButtonLink
									fullWidth
									style={{ textTransform: 'none' }}
									href={composeDynamicRoute(
										Routes.activity.ASSIGNMENT_REVIEW.path,
										{
											universityId: String(
												router.query.universityId
											),
											collegeId: String(
												router.query.collegeId
											),
											courseId: String(
												router.query.courseId
											),
											activityId: String(
												router.query.activityId
											),
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
										<Box
											display="flex"
											alignItems="center"
											pr={2}
										>
											<Box pr={2}>
												<MyAvatar
													src={
														userAssignment.user
															.avatar
													}
													alt={`${userAssignment.user.firstName} ${userAssignment.user.lastName}`}
												/>
											</Box>
											<Typography>
												{userAssignment.grade ??
													'Not graded yet'}{' '}
												/ {activity.maxGrade}
												<Box component="span" px={2}>
													-
												</Box>
												{userAssignment.user.firstName}{' '}
												{
													userAssignment.user
														.fatherInitial
												}
												. {userAssignment.user.lastName}
											</Typography>
										</Box>
										<Hidden smDown>
											<div>
												<Typography>
													{new Date(
														userAssignment.updatedAt
													).toLocaleString()}
												</Typography>
											</div>
										</Hidden>
									</Box>
								</ButtonLink>
							</Box>
						)
					)}
				</Box>
			</>
		);
	}
);
