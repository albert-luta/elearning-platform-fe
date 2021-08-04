import { ButtonWithLoader } from 'domains/shared/components/buttons/ButtonWithLoader';
import { Box, CircularProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { UserActivityReviewInfo } from 'domains/activity/components/UserActivityReviewInfo';
import { FormVerticalLayout } from 'domains/shared/components/form/FormVerticalLayout';
import { Formik, Field, Form } from 'formik';
import {
	useUpdateUserAssignmentMutation,
	useUserAssignmentQuery
} from 'generated/graphql';
import { useRouter } from 'next/router';
import { memo } from 'react';
import * as Yup from 'yup';
import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { FormErrors } from 'domains/shared/constants/FormErrors';

interface ReviewUserAssignment {
	grade: number | undefined;
}
const validationSchema: Yup.SchemaOf<ReviewUserAssignment> = Yup.object({
	grade: Yup.number()
		.min(0, ({ min }) => FormErrors.MIN_NUMBER + min)
		.typeError(FormErrors.ONLY_NUMBER)
});

export const AssignmentReview = memo(function AssignmentReview() {
	const router = useRouter();
	const userAssignment = useUserAssignmentQuery({
		variables: {
			id: String(router.query.userAssignmentId)
		}
	});

	const [updateUserAssignment] = useUpdateUserAssignmentMutation();
	const reviewUserAssignment = useFormikSubmit<ReviewUserAssignment>(
		(data) => {
			return updateUserAssignment({
				variables: {
					id: userAssignment.data?.userAssignment?.id ?? '',
					data: {
						...data,
						updatedAt:
							userAssignment.data?.userAssignment?.updatedAt ??
							'',
						grade:
							(data.grade as typeof data.grade | '') === ''
								? null
								: data.grade
					}
				}
			});
		}
	);

	if (userAssignment.loading || !userAssignment.data?.userAssignment) {
		return (
			<Box display="flex" justifyContent="center">
				<CircularProgress />
			</Box>
		);
	}

	return (
		<>
			<UserActivityReviewInfo
				user={userAssignment.data.userAssignment.user}
			/>

			<Box mt={2}>
				<Formik
					onSubmit={reviewUserAssignment}
					initialValues={{
						grade:
							userAssignment.data.userAssignment.grade ??
							undefined
					}}
					validationSchema={validationSchema}
				>
					{({ isSubmitting }) => (
						<Form>
							<FormVerticalLayout
								fields={
									<Field
										component={TextField}
										name="grade"
										label="Grade"
										type="number"
										fullWidth
									/>
								}
								actions={
									<ButtonWithLoader
										variant="contained"
										color="primary"
										fullWidth
										loading={isSubmitting}
										type="submit"
									>
										Update
									</ButtonWithLoader>
								}
							/>
						</Form>
					)}
				</Formik>
			</Box>
		</>
	);
});
