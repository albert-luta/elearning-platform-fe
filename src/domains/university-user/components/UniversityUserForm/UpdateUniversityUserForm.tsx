import { Box, CircularProgress, Typography } from '@material-ui/core';
import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { normalizeUpdateFormInitialValues } from 'domains/shared/utils/form/normalizeUpdateFormInitialValues';
import {
	useUniversityUserQuery,
	useUpdateUniversityUserMutation
} from 'generated/graphql';
import { FC, memo } from 'react';
import {
	UniversityUserForm,
	UpdateUniversityUserFormValues
} from './UniversityUserForm';

interface UpdateUniversityUserFormProps {
	universityUserId: string;
	onSuccess: () => void;
}

export const UpdateUniversityUserForm: FC<UpdateUniversityUserFormProps> = memo(
	function UpdateUniversityUserForm({ universityUserId, onSuccess }) {
		const universityUser = useUniversityUserQuery({
			variables: {
				id: universityUserId
			}
		});
		const [updateUniversityUser] = useUpdateUniversityUserMutation();
		const handleUpdateUniversityUser = useFormikSubmit<UpdateUniversityUserFormValues>(
			async ({ collegesToEnrollAt, ...data }) => {
				const res = await updateUniversityUser({
					variables: {
						id: universityUserId,
						data: {
							...data,
							collegesToEnrollAt: collegesToEnrollAt.map(
								({ name, coursesToEnrollAt, ...college }) => ({
									...college,
									coursesToEnrollAt: coursesToEnrollAt.map(
										({ name, ...course }) => course
									)
								})
							)
						}
					}
				});
				if (!res.data) return;

				onSuccess();
			}
		);

		if (universityUser.loading) {
			return (
				<Box display="flex" justifyContent="center">
					<CircularProgress />
				</Box>
			);
		}

		if (!universityUser.data?.universityUser) {
			return (
				<Typography align="center" color="textSecondary">
					There was a problem getting data about the user
				</Typography>
			);
		}

		const { roleId, collegesEnrolledAt } = normalizeUpdateFormInitialValues(
			universityUser.data.universityUser
		);

		return (
			<UniversityUserForm
				type="update"
				initialValues={{
					roleId,
					collegesToEnrollAt: collegesEnrolledAt.map(
						({ college: { id, name }, coursesEnrolledAt }) => ({
							id,
							name,
							coursesToEnrollAt: coursesEnrolledAt.map(
								({ course: { id, name } }) => ({
									id,
									name
								})
							)
						})
					)
				}}
				onUpdate={handleUpdateUniversityUser}
			/>
		);
	}
);
