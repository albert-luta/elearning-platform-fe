import { FC, memo } from 'react';
import {
	Table,
	TableCell,
	TableContainer,
	TableRow,
	TableBody
} from '@material-ui/core';
import { formatDuration } from 'domains/shared/utils/formatDuration';
import { Countdown } from 'domains/shared/hooks/useCountdown';

type AssignmentStatusProps = {
	maxGrade: number;
	deadline: Date;
	deadlineCountdown: Countdown;
} & (
	| { type: 'general' }
	| {
			type: 'specific';
			grade?: number | null;
			updatedAt: Date | null;
			updatedAtCountdown: Countdown;
	  }
);

export const AssignmentStatus: FC<AssignmentStatusProps> = memo(
	function AssignmentStatus(props) {
		return (
			<TableContainer>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>
								{props.type === 'general' && 'Max '}Grade
							</TableCell>
							<TableCell>
								{props.type === 'specific' &&
									`${props.grade ?? 'Not graded yet'} / `}
								{props.maxGrade}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Deadline</TableCell>
							<TableCell>
								{props.deadline.toLocaleString()} -{' '}
								{props.deadlineCountdown.hasCompleted
									? 'No time'
									: formatDuration(
											props.deadlineCountdown.duration
									  )}{' '}
								remaining
							</TableCell>
						</TableRow>
						{props.type === 'specific' && (
							<TableRow>
								<TableCell>Last time updated</TableCell>
								<TableCell>
									{props.updatedAt
										? `${props.updatedAt.toLocaleString()} - ${formatDuration(
												props.updatedAtCountdown
													.duration
										  )} ago`
										: 'Not updated yet'}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		);
	}
);
