import { Box, Typography } from '@material-ui/core';
import { ActivityLoadingOrError } from 'domains/activity/components/ActivityLoadingOrError';
import { AssignmentStatus } from 'domains/activity/components/AssignmentStatus';
import { CommonActivityDisplay } from 'domains/activity/components/CommonActivityDisplay';
/* import { UserActivityReviewInfo } from 'domains/activity/components/UserActivityReviewInfo'; */
import { FileButton } from 'domains/shared/components/buttons/FileButton';
import { MyHead } from 'domains/shared/components/MyHead';
import { useCountdown } from 'domains/shared/hooks/useCountdown';
import {
	AssignmentObject,
	useActivityQuery,
	useUserAssignmentQuery
} from 'generated/graphql';
import { useRouter } from 'next/router';

export default function AssignmentReview() {
	const router = useRouter();
	const activityQuery = useActivityQuery({
		variables: {
			id: String(router.query.activityId)
		}
	});
	const userAssignment = useUserAssignmentQuery({
		variables: {
			id: String(router.query.userAssignmentId)
		}
	});

	const deadline = new Date(
		(activityQuery.data?.activity as AssignmentObject | undefined)
			?.deadline ?? ''
	);
	const deadlineCountdown = useCountdown(deadline.getTime());

	const updatedAt = userAssignment.data?.userAssignment?.updatedAt
		? new Date(userAssignment.data?.userAssignment?.updatedAt)
		: null;
	const updatedAtCountdown = useCountdown(
		updatedAt?.getTime() ?? Date.now(),
		true
	);

	return (
		<>
			<MyHead title="Assignment review" />

			{(() => {
				if (
					userAssignment.loading ||
					!userAssignment.data?.userAssignment
				) {
					return null;
				}

				if (
					activityQuery.loading ||
					!activityQuery.data ||
					activityQuery.data.activity.__typename !==
						'AssignmentObject'
				) {
					return (
						<ActivityLoadingOrError
							activityQuery={activityQuery}
							typename="AssignmentObject"
						/>
					);
				}

				return (
					<>
						{/* TODO: put an 'update' form at the right of the page */}
						{/* TODO: add the grade input and the update button */}
						{/* <UserActivityReviewInfo
							user={userAssignment.data.userAssignment.user}
						/> */}

						<CommonActivityDisplay
							activity={activityQuery.data.activity}
						/>
						<Box mt={2}>
							<Typography variant="h5">
								Assignment status
							</Typography>
						</Box>
						<Box mt={2}>
							<AssignmentStatus
								type="specific"
								maxGrade={activityQuery.data.activity.maxGrade}
								deadline={deadline}
								deadlineCountdown={deadlineCountdown}
								grade={
									userAssignment.data?.userAssignment.grade
								}
								updatedAt={updatedAt}
								updatedAtCountdown={updatedAtCountdown}
							/>
						</Box>

						<Box mt={2}>
							<Typography variant="h5">
								Student uploads
							</Typography>
						</Box>
						{!!userAssignment.data.userAssignment.files && (
							<Box mt={2}>
								{userAssignment.data.userAssignment.files.map(
									(file, i) => (
										<Box key={file} mt={i && 1}>
											<FileButton file={file} download />
										</Box>
									)
								)}
							</Box>
						)}
					</>
				);
			})()}
		</>
	);
}
