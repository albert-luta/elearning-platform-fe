import { FormVerticalLayout } from 'domains/shared/components/form/FormVerticalLayout';
import { FormErrors } from 'domains/shared/constants/form-errors';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { TextField } from 'formik-material-ui';
import { FC, memo, useCallback } from 'react';
import * as yup from 'yup';
import { useLoginMutation } from 'generated/graphql';
import { accessTokenVar } from 'domains/auth/reactive-vars';
import { toFormikErrors } from 'domains/shared/utils/toFormikErrors';
import { ButtonWithLoader } from 'domains/shared/components/ButtonWithLoader';

interface Values {
	email: string;
	password: string;
}

const initialValues: Values = {
	email: '',
	password: ''
};

const validationSchema = yup.object().shape({
	email: yup
		.string()
		.email(FormErrors.VALID_EMAIL)
		.trim()
		.required(FormErrors.REQUIRED),
	password: yup.string().trim().required(FormErrors.REQUIRED)
});

export const LoginForm: FC = memo(function LoginForm() {
	const [login] = useLoginMutation();
	const handleLogin = useCallback(
		async (
			values: Values,
			{ setSubmitting, setErrors }: FormikHelpers<Values>
		) => {
			try {
				const res = await login({
					variables: {
						user: values
					}
				});
				accessTokenVar(res.data?.login.accessToken);
			} catch (e) {
				setErrors(toFormikErrors(e));
			} finally {
				setSubmitting(false);
			}
		},
		[login]
	);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleLogin}
		>
			{({ submitForm, isSubmitting }) => (
				<Form autoComplete="on">
					<FormVerticalLayout
						fields={
							<>
								<Field
									component={TextField}
									name="email"
									type="email"
									label="Email"
									fullWidth
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
								Login
							</ButtonWithLoader>
						}
					/>
				</Form>
			)}
		</Formik>
	);
});
