import { Box, CircularProgress } from '@material-ui/core';
import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { normalizeUpdateFormInitialValues } from 'domains/shared/utils/form/normalizeUpdateFormInitialValues';
import { useActivityQuery, useUpdateForumMutation } from 'generated/graphql';
import { FC, memo } from 'react';
import { UpdateActivityProps } from '../BaseActivityForm';
import { ForumForm, UpdateForumFormValues } from './ForumForm';

export const UpdateForumForm: FC<UpdateActivityProps> = memo(
	function UpdateForumForm({ activity: { id }, onSuccess }) {
		const activity = useActivityQuery({
			variables: { id }
		});
		const [updateForum] = useUpdateForumMutation();
		const handleUpdateForum = useFormikSubmit<UpdateForumFormValues>(
			async ({ files, filesToDelete, ...data }) => {
				const res = await updateForum({
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
			activity.data.activity.__typename !== 'ForumObject'
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
			...initialValues
		} = normalizeUpdateFormInitialValues(activity.data.activity);

		return (
			<ForumForm
				type="update"
				initialValues={{
					...initialValues,
					description: description ?? '',
					files: {},
					oldFiles: files,
					filesToDelete: {}
				}}
				onUpdate={handleUpdateForum}
			/>
		);
	}
);
