import { Box, CircularProgress } from '@material-ui/core';
import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { normalizeUpdateFormInitialValues } from 'domains/shared/utils/form/normalizeUpdateFormInitialValues';
import { useActivityQuery, useUpdateResourceMutation } from 'generated/graphql';
import { FC, memo } from 'react';
import { UpdateActivityProps } from '../BaseActivityForm';
import { ResourceForm, UpdateResourceFormValues } from './ResourceForm';

export const UpdateResourceForm: FC<UpdateActivityProps> = memo(
	function UpdateResourceForm({ activity: { id }, onSuccess }) {
		const activity = useActivityQuery({
			variables: { id }
		});
		const [updateResource] = useUpdateResourceMutation();
		const handleUpdateResource = useFormikSubmit<UpdateResourceFormValues>(
			async ({ files, filesToDelete, ...data }) => {
				const res = await updateResource({
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
			activity.data.activity.__typename !== 'ResourceObject'
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
			<ResourceForm
				type="update"
				initialValues={{
					...initialValues,
					description: description ?? '',
					files: {},
					oldFiles: files,
					filesToDelete: {}
				}}
				onUpdate={handleUpdateResource}
			/>
		);
	}
);
