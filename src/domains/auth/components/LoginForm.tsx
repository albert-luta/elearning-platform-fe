import { FormVerticalLayout } from 'domains/shared/components/form/FormVerticalLayout';
import { FormErrors } from 'domains/shared/constants/FormErrors';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { FC, memo } from 'react';
import * as yup from 'yup';
import { useLoginMutation } from 'generated/graphql';
import { accessTokenVar } from 'domains/auth/reactiveVars';
import { ButtonWithLoader } from 'domains/shared/components/buttons/ButtonWithLoader';
import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { useRouter } from 'next/router';
import { Routes } from 'domains/shared/constants/Routes';

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
		.trim()
		.email(FormErrors.VALID_EMAIL)
		.required(FormErrors.REQUIRED),
	password: yup.string().trim().required(FormErrors.REQUIRED)
});

export const LoginForm: FC = memo(function LoginForm() {
	const router = useRouter();

	const [login] = useLoginMutation();
	const handleLogin = useFormikSubmit<Values>(async (values) => {
		const res = await login({
			variables: {
				user: values
			},
			fetchPolicy: 'no-cache'
		});
		accessTokenVar(res.data?.login.accessToken);
		router.push(Routes.user.DASHBOARD.path);
	});

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleLogin}
		>
			{({ isSubmitting }) => (
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
