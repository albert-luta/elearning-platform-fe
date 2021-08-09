import { Box, CircularProgress } from '@material-ui/core';
import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { normalizeUpdateFormInitialValues } from 'domains/shared/utils/form/normalizeUpdateFormInitialValues';
import { useActivityQuery, useUpdateQuizMutation } from 'generated/graphql';
import { FC, memo } from 'react';
import { UpdateActivityProps } from '../BaseActivityForm';
import { QuizForm, UpdateQuizFormValues } from './QuizForm';

export const UpdateQuizForm: FC<UpdateActivityProps> = memo(
	function UpdateQuizForm({ activity: { id }, onSuccess }) {
		const activity = useActivityQuery({
			variables: { id }
		});
		const [updateQuiz] = useUpdateQuizMutation();
		const handleUpdateQuiz = useFormikSubmit<UpdateQuizFormValues>(
			async ({ files, filesToDelete, ...data }) => {
				const res = await updateQuiz({
					variables: {
						id,
						data: {
							...data,
							sectionId: activity.data?.activity.sectionId ?? '',
							filesToDelete: Object.keys(filesToDelete)
						} as any,
						// TODO: send the corect update quiz data
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
			activity.data.activity.__typename !== 'QuizObject'
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
			<QuizForm
				type="update"
				initialValues={{
					...initialValues,
					description: description ?? '',
					files: {},
					oldFiles: files,
					filesToDelete: {}
				}}
				onUpdate={handleUpdateQuiz}
			/>
		);
	}
);
