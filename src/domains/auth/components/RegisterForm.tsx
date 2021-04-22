import { ChangeEvent, FC, memo, useCallback } from 'react';
import * as yup from 'yup';
import { FormErrors } from 'domains/shared/constants/FormErrors';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { TextField } from 'formik-material-ui';
import { FormVerticalLayout } from 'domains/shared/components/form/FormVerticalLayout';
import { ValidationRegexp } from 'domains/shared/constants/ValidationRegexp';
import { useRegisterMutation } from 'generated/graphql';
import { toFormikErrors } from 'domains/shared/utils/toFormikErrors';
import { accessTokenVar } from '../reactiveVars';
import { ButtonWithLoader } from 'domains/shared/components/buttons/ButtonWithLoader';

interface Values {
	firstName: string;
	lastName: string;
	fatherInitial: string;
	email: string;
	password: string;
}

const initialValues: Values = {
	firstName: '',
	lastName: '',
	fatherInitial: '',
	email: '',
	password: ''
};

const validationSchema = yup.object().shape({
	firstName: yup.string().trim().required(FormErrors.REQUIRED),
	lastName: yup.string().trim().required(FormErrors.REQUIRED),
	fatherInitial: yup
		.string()
		.trim()
		.matches(ValidationRegexp.ALPHA, FormErrors.ALPHA)
		.required(FormErrors.REQUIRED),
	email: yup
		.string()
		.trim()
		.email(FormErrors.VALID_EMAIL)
		.required(FormErrors.REQUIRED),
	password: yup.string().trim().required(FormErrors.REQUIRED)
});

export const RegisterForm: FC = memo(function RegisterForm() {
	const [register] = useRegisterMutation();
	const handleRegister = useCallback(
		async (
			values: Values,
			{ setSubmitting, setErrors }: FormikHelpers<Values>
		) => {
			try {
				const res = await register({
					variables: {
						user: values
					},
					fetchPolicy: 'no-cache'
				});
				accessTokenVar(res.data?.register.accessToken);
			} catch (e) {
				setErrors(toFormikErrors(e));
			} finally {
				setSubmitting(false);
			}
		},
		[register]
	);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleRegister}
		>
			{({ submitForm, setFieldValue, isSubmitting }) => (
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
							</>
						}
						actions={
							<ButtonWithLoader
								variant="contained"
								color="primary"
								onClick={submitForm}
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
