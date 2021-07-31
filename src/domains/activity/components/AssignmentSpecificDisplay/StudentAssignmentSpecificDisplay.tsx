import { FC, memo, useCallback, useMemo, useState } from 'react';
import {
	Table,
	TableCell,
	TableContainer,
	TableRow,
	TableBody,
	CircularProgress,
	Box,
	Collapse
} from '@material-ui/core';
import {
	AssignmentObject,
	useMyAssignmentQuery,
	useUpdateMyAssignmentMutation
} from 'generated/graphql';
import { formatDuration } from 'domains/shared/utils/formatDuration';
import { useCountdown } from 'domains/shared/hooks/useCountdown';
import { FileUpload } from 'domains/shared/components/form/FileUpload';
import { ButtonWithLoader } from 'domains/shared/components/buttons/ButtonWithLoader';
import { FileButton } from 'domains/shared/components/buttons/FileButton';

interface StudentAssignmentSpecificDisplayProps {
	activity: AssignmentObject;
}

export const StudentAssignmentSpecificDisplay: FC<StudentAssignmentSpecificDisplayProps> = memo(
	function StudentAssignmentSpecificDisplay({ activity }) {
		const myAssignment = useMyAssignmentQuery({
			variables: { id: activity.id }
		});

		const deadline = new Date(activity.deadline);
		const deadlineCountdown = useCountdown(deadline.getTime());

		const updatedAt = myAssignment.data?.myAssignment?.updatedAt
			? new Date(myAssignment.data?.myAssignment?.updatedAt)
			: null;
		const updatedAtCountdown = useCountdown(
			updatedAt?.getTime() ?? Date.now(),
			true
		);

		const [newFiles, setNewFiles] = useState<Record<string, File>>({});
		const [filesToDelete, setFilesToDelete] = useState<
			Record<string, true>
		>({});
		const [
			updateMyAssignment,
			{ loading: updateFilesLoading }
		] = useUpdateMyAssignmentMutation();
		const updateFiles = useCallback((): void => {
			updateMyAssignment({
				variables: {
					id: activity.id,
					newFiles: Object.values(newFiles),
					data: {
						oldFiles: myAssignment.data?.myAssignment?.files ?? [],
						filesToDelete: Object.keys(filesToDelete)
					}
				}
			})
				.catch(() => null)
				.finally(() => {
					setNewFiles({});
					setFilesToDelete({});
				});
		}, [
			updateMyAssignment,
			newFiles,
			activity.id,
			filesToDelete,
			myAssignment.data?.myAssignment?.files
		]);

		const showUploadButton = useMemo(
			() =>
				Object.values(newFiles).length > 0 ||
				Object.values(filesToDelete).length > 0,
			[newFiles, filesToDelete]
		);

		if (myAssignment.loading || !myAssignment.data) {
			return (
				<Box display="flex" justifyContent="center">
					<CircularProgress />
				</Box>
			);
		}

		return (
			<>
				<TableContainer>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>Grade</TableCell>
								<TableCell>
									{myAssignment.data.myAssignment?.grade ??
										'Not graded yet'}{' '}
									/ {activity.maxGrade}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Deadline</TableCell>
								<TableCell>
									{deadline.toLocaleString()} -{' '}
									{deadlineCountdown.hasCompleted
										? 'No time'
										: formatDuration(
												deadlineCountdown.duration
										  )}{' '}
									remaining
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Last time updated</TableCell>
								<TableCell>
									{updatedAt
										? `${updatedAt.toLocaleString()} - ${formatDuration(
												updatedAtCountdown.duration
										  )} ago`
										: 'Not updated yet'}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>

				<Collapse
					in={
						deadlineCountdown.hasCompleted &&
						!!myAssignment.data.myAssignment?.files?.length
					}
				>
					<Box
						mt={2}
						style={{
							overflowY: 'auto',
							maxHeight: 200
						}}
					>
						{myAssignment.data.myAssignment?.files?.map(
							(file, i) => (
								<Box key={i} mt={i && 1}>
									<FileButton file={file} download />
								</Box>
							)
						)}
					</Box>
				</Collapse>
				<Collapse in={!deadlineCountdown.hasCompleted}>
					<FileUpload
						newFiles={newFiles}
						onNewFilesUpdate={setNewFiles}
						filesToDelete={filesToDelete}
						onFilesToDeleteUpdate={setFilesToDelete}
						oldFiles={
							myAssignment.data.myAssignment?.files ?? undefined
						}
					/>

					<Collapse in={showUploadButton}>
						<Box mt={1} display="flex" justifyContent="end">
							<ButtonWithLoader
								variant="contained"
								color="primary"
								loading={updateFilesLoading}
								onClick={updateFiles}
							>
								Update
							</ButtonWithLoader>
						</Box>
					</Collapse>
				</Collapse>
			</>
		);
	}
);
