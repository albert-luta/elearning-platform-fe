import { ChangeEvent, FC, memo } from 'react';
import * as yup from 'yup';
import { FormErrors } from 'domains/shared/constants/FormErrors';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { FormVerticalLayout } from 'domains/shared/components/form/FormVerticalLayout';
import { ValidationRegexp } from 'domains/shared/constants/ValidationRegexp';
import { useRegisterMutation } from 'generated/graphql';
import { accessTokenVar } from '../reactiveVars';
import { ButtonWithLoader } from 'domains/shared/components/buttons/ButtonWithLoader';
import {
	FileUpload,
	FileUploadProps
} from 'domains/shared/components/form/FileUpload';
import { FileType } from 'domains/shared/constants/file/FileType';
import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { useRouter } from 'next/router';
import { Routes } from 'domains/shared/constants/Routes';
import { composeLabel } from 'domains/shared/utils/form/composeLabel';

interface Values {
	firstName: string;
	lastName: string;
	fatherInitial: string;
	email: string;
	password: string;
	avatar: Record<string, File>;
}

const initialValues: Values = {
	firstName: '',
	lastName: '',
	fatherInitial: '',
	email: '',
	password: '',
	avatar: {}
};

const validationSchema = yup.object().shape({
	firstName: yup.string().trim().required(FormErrors.REQUIRED),
	lastName: yup.string().trim().required(FormErrors.REQUIRED),
	fatherInitial: yup
		.string()
		.trim()
		.matches(ValidationRegexp.ALPHA, FormErrors.ONLY_ALPHA)
		.required(FormErrors.REQUIRED),
	email: yup
		.string()
		.trim()
		.email(FormErrors.VALID_EMAIL)
		.required(FormErrors.REQUIRED),
	password: yup.string().trim().required(FormErrors.REQUIRED),
	avatar: yup.object()
});

export const RegisterForm: FC = memo(function RegisterForm() {
	const router = useRouter();
	const [register] = useRegisterMutation();
	const handleRegister = useFormikSubmit<Values>(async (values) => {
		const { avatar: _, ...user } = values;
		const avatar = Object.values(values.avatar)[0];
		const res = await register({
			variables: {
				user,
				avatar
			},
			fetchPolicy: 'no-cache'
		});
		accessTokenVar(res.data?.register.accessToken);
		router.push(Routes.user.DASHBOARD.path);
	});

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleRegister}
		>
			{({ isSubmitting, setFieldValue }) => (
				<Form>
					<FormVerticalLayout
						fields={
							<>
								<Field
									component={TextField}
									name="firstName"
									label="First Name"
									fullWidth
								/>
								<Field
									component={TextField}
									name="lastName"
									label="Last Name"
									fullWidth
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) =>
										setFieldValue(
											'lastName',
											e.target.value.toUpperCase()
										)
									}
								/>
								<Field
									component={TextField}
									name="fatherInitial"
									label="Father's Initial"
									inputProps={{ maxLength: 1 }}
									fullWidth
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) =>
										setFieldValue(
											'fatherInitial',
											e.target.value.toUpperCase()
										)
									}
								/>
								<Field
									component={TextField}
									name="email"
									type="email"
									label="Email"
									fullWidth
									autoComplete="on"
								/>
								<Field
									component={TextField}
									name="password"
									type="password"
									label="Password"
									fullWidth
								/>
								<Field name="avatar">
									{({
										field: { value }
									}: {
										field: {
											value: FileUploadProps['files'];
										};
									}) => (
										<FileUpload
											label={composeLabel(
												'Avatar',
												'optional'
											)}
											helperText="Recommended image size: 40x40px"
											files={value}
											onChange={(getUpdatedFiles) => {
												setFieldValue(
													'avatar',
													getUpdatedFiles(value)
												);
											}}
											maxFiles={1}
											maxFileSize={10}
											acceptedFileTypes={[FileType.IMAGE]}
										/>
									)}
								</Field>
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
								Register
							</ButtonWithLoader>
						}
					/>
				</Form>
			)}
		</Formik>
	);
});
