import { ButtonWithLoader } from 'domains/shared/components/buttons/ButtonWithLoader';
import { FormVerticalLayout } from 'domains/shared/components/form/FormVerticalLayout';
import { FormErrors } from 'domains/shared/constants/FormErrors';
import { Field, Form } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import { FC, memo } from 'react';
import * as Yup from 'yup';
import { FormProps } from 'domains/shared/types/form';
import { MyFormik } from 'domains/shared/components/form/MyFormik';
import {
	Box,
	CircularProgress,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Typography
} from '@material-ui/core';
import { EnrollmentField } from './EnrollmentField';
import { useCollegesQuery, useRolesQuery } from 'generated/graphql';
import { selectedUniversityVar } from 'domains/university/reactiveVars';
import { formatUserRole } from 'domains/shared/utils/formatUserRole';
import { UserRole } from 'domains/shared/constants/UserRole';

const ROLE_ID_DEFAULT_VALUE = 'none';

export interface CourseToEnrollAt {
	id: string;
	name: string;
}
export interface CollegeToEnrollAt {
	id: string;
	name: string;
	coursesToEnrollAt: CourseToEnrollAt[];
}

export interface CreateUniversityUserFormValues {
	userEmail: string;
	roleId: string;
	collegesToEnrollAt: CollegeToEnrollAt[];
}
export type UpdateUniversityUserFormValues = Omit<
	CreateUniversityUserFormValues,
	'userEmail'
>;

const initialValuesCreate: CreateUniversityUserFormValues = {
	userEmail: '',
	roleId: ROLE_ID_DEFAULT_VALUE,
	collegesToEnrollAt: []
};

const createUniversityUserValidationSchema: Yup.SchemaOf<CreateUniversityUserFormValues> = Yup.object(
	{
		userEmail: Yup.string()
			.trim()
			.email(FormErrors.VALID_EMAIL)
			.required(FormErrors.REQUIRED),
		roleId: Yup.string()
			.trim()
			.notOneOf([ROLE_ID_DEFAULT_VALUE], FormErrors.REQUIRED)
			.required(FormErrors.REQUIRED),
		collegesToEnrollAt: Yup.array()
			.of(
				Yup.object({
					id: Yup.string().trim().required(FormErrors.REQUIRED),
					name: Yup.string().trim().required(FormErrors.REQUIRED),
					coursesToEnrollAt: Yup.array()
						.of(
							Yup.object({
								id: Yup.string()
									.trim()
									.required(FormErrors.REQUIRED),
								name: Yup.string()
									.trim()
									.required(FormErrors.REQUIRED)
							}).required()
						)
						.required()
				}).required()
			)
			.required()
	}
);
const updateUniversityUserValidationSchema: Yup.SchemaOf<UpdateUniversityUserFormValues> = createUniversityUserValidationSchema
	.clone()
	.omit(['userEmail']);

type UniversityFormProps = FormProps<
	CreateUniversityUserFormValues,
	UpdateUniversityUserFormValues
>;

export const UniversityUserForm: FC<UniversityFormProps> = memo(
	function UniversityUserForm(props) {
		const roles = useRolesQuery();
		const colleges = useCollegesQuery({
			variables: {
				universityId: selectedUniversityVar()?.id ?? 'placeholder'
			}
		});

		if (roles.loading || colleges.loading) {
			return (
				<Box display="flex" justifyContent="center">
					<CircularProgress />
				</Box>
			);
		}

		if (!roles.data || !colleges.data) {
			return (
				<Typography align="center">
					There was a problem on the server, please try again later
				</Typography>
			);
		}

		const adminRoleId =
			roles.data.roles.find(({ name }) => name === UserRole.ADMIN)?.id ??
			'';

		return (
			<MyFormik
				{...props}
				initialValuesCreate={initialValuesCreate}
				validationSchemaCreate={createUniversityUserValidationSchema}
				validationSchemaUpdate={updateUniversityUserValidationSchema}
			>
				{({ isSubmitting, errors, values, setFieldValue, touched }) => (
					<Form>
						<FormVerticalLayout
							fields={
								<>
									{props.type === 'create' && (
										<Field
											component={TextField}
											name="userEmail"
											label="User Email"
											fullWidth
										/>
									)}
									<div>
										<FormControl
											error={Boolean(
												touched.roleId && errors.roleId
											)}
										>
											<InputLabel htmlFor="roleId">
												Role
											</InputLabel>
											<Field
												component={Select}
												name="roleId"
												inputProps={{
													id: 'roleId'
												}}
											>
												<MenuItem
													value={
														ROLE_ID_DEFAULT_VALUE
													}
													disabled
												>
													Pick a role for the user
												</MenuItem>
												{roles.data?.roles.map(
													(role) => (
														<MenuItem
															key={role.id}
															value={role.id}
														>
															{formatUserRole(
																role.name as UserRole
															)}
														</MenuItem>
													)
												)}
											</Field>
										</FormControl>
										{touched.roleId && errors.roleId && (
											<FormHelperText error>
												{errors.roleId}
											</FormHelperText>
										)}
									</div>
									{values.roleId !== adminRoleId && (
										<>
											<Box mt={2}>
												<Typography
													variant="h6"
													color="textSecondary"
												>
													Enrolled at
												</Typography>
											</Box>
											<EnrollmentField
												name="collegesToEnrollAt"
												colleges={
													colleges.data?.colleges ??
													[]
												}
												collegesToEnrollAt={
													values.collegesToEnrollAt
												}
												onPickColleges={(
													collegesToEnrollAt
												) => {
													setFieldValue(
														'collegesToEnrollAt',
														collegesToEnrollAt
													);
												}}
											/>
										</>
									)}
								</>
							}
							actions={
								<ButtonWithLoader
									variant="contained"
									color="primary"
									fullWidth
									loading={isSubmitting}
									type="submit"
								>
									{props.type === 'create' ? 'Add' : 'Update'}
								</ButtonWithLoader>
							}
						/>
					</Form>
				)}
			</MyFormik>
		);
	}
);

// TODO: CreateUniversityUserForm, Update, delete
