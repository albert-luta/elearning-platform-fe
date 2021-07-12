import { Box, CircularProgress } from '@material-ui/core';
import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { normalizeUpdateFormInitialValues } from 'domains/shared/utils/form/normalizeUpdateFormInitialValues';
import {
	useActivityQuery,
	useUpdateAssignmentMutation
} from 'generated/graphql';
import { FC, memo } from 'react';
import { UpdateActivityProps } from '../BaseActivityForm';
import { AssignmentForm, UpdateAssignmentFormValues } from './AssignmentForm';

export const UpdateAssignmentForm: FC<UpdateActivityProps> = memo(
	function UpdateAssignmentForm({ activity: { id }, onSuccess }) {
		const activity = useActivityQuery({
			variables: { id }
		});
		const [updateAssignment] = useUpdateAssignmentMutation();
		const handleUpdateAssignment = useFormikSubmit<UpdateAssignmentFormValues>(
			async ({ files, filesToDelete, ...data }) => {
				const res = await updateAssignment({
					variables: {
						id,
						data: {
							...data,
							sectionId: activity.data?.activity.sectionId ?? '',
							filesToDelete: Object.keys(filesToDelete)
						},
						newFiles: Object.values(files)
					}
				});
				if (!res.data) return;

				onSuccess();
			}
		);

		if (
			activity.loading ||
			!activity.data ||
			activity.data.activity.__typename !== 'AssignmentObject'
		) {
			return (
				<Box py={2} display="flex" justifyContent="center">
					<CircularProgress color="inherit" />
				</Box>
			);
		}

		const {
			type,
			sectionId,
			createdAt,
			description,
			files,
			deadline,
			...initialValues
		} = normalizeUpdateFormInitialValues(activity.data.activity);

		return (
			<AssignmentForm
				type="update"
				initialValues={{
					...initialValues,
					description: description ?? '',
					files: {},
					oldFiles: files,
					filesToDelete: {},
					deadline: new Date(deadline)
				}}
				onUpdate={handleUpdateAssignment}
			/>
		);
	}
);
