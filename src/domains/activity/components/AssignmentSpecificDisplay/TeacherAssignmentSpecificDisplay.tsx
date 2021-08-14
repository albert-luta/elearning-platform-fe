import { Box, CircularProgress, Typography } from '@material-ui/core';
import { useCountdown } from 'domains/shared/hooks/useCountdown';
import {
	AssignmentFieldsFragment,
	BaseActivityFieldsFragment,
	useUserAssignmentsQuery
} from 'generated/graphql';
import { FC, memo } from 'react';
import { AssignmentStatus } from '../AssignmentStatus';
import { StudentAssignmentButton } from './StudentAssignmentButton';

interface TeacherAssignmentSpecificDisplayProps {
	activity: BaseActivityFieldsFragment & AssignmentFieldsFragment;
}

export const TeacherAssignmentSpecificDisplay: FC<TeacherAssignmentSpecificDisplayProps> = memo(
	function TeacherAssignmentSpecificDisplay({ activity }) {
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
							<StudentAssignmentButton
								key={userAssignment.id}
								userAssignment={userAssignment}
								maxGrade={activity.maxGrade}
							/>
						)
					)}
				</Box>
			</>
		);
	}
);
