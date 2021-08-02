import { FC, memo, useCallback, useMemo, useState } from 'react';
import { CircularProgress, Box, Collapse, Typography } from '@material-ui/core';
import {
	AssignmentObject,
	useMyAssignmentQuery,
	useUpdateMyAssignmentMutation
} from 'generated/graphql';
import { useCountdown } from 'domains/shared/hooks/useCountdown';
import { FileUpload } from 'domains/shared/components/form/FileUpload';
import { ButtonWithLoader } from 'domains/shared/components/buttons/ButtonWithLoader';
import { FileButton } from 'domains/shared/components/buttons/FileButton';
import { AssignmentStatus } from '../AssignmentStatus';

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
				<Typography variant="h5">Assignment status</Typography>
				<Box mt={2}>
					<AssignmentStatus
						type="specific"
						maxGrade={activity.maxGrade}
						deadline={deadline}
						deadlineCountdown={deadlineCountdown}
						grade={myAssignment.data.myAssignment?.grade}
						updatedAt={updatedAt}
						updatedAtCountdown={updatedAtCountdown}
					/>
				</Box>

				<Box mt={2}>
					<Typography variant="h5">Uploads</Typography>
				</Box>
				<Box mt={2}>
					<Collapse
						in={
							deadlineCountdown.hasCompleted &&
							!!myAssignment.data.myAssignment?.files?.length
						}
					>
						{myAssignment.data.myAssignment?.files?.map(
							(file, i) => (
								<Box key={file} mt={i && 1}>
									<FileButton file={file} download />
								</Box>
							)
						)}
					</Collapse>
					<Collapse in={!deadlineCountdown.hasCompleted}>
						<FileUpload
							newFiles={newFiles}
							onNewFilesUpdate={setNewFiles}
							filesToDelete={filesToDelete}
							onFilesToDeleteUpdate={setFilesToDelete}
							oldFiles={
								myAssignment.data.myAssignment?.files ??
								undefined
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
				</Box>
			</>
		);
	}
);
