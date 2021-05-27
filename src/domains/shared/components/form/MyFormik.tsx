import { FormProps } from 'domains/shared/types/form';
import { Formik, FormikConfig } from 'formik';

type MyFormikProps<C, U> = FormProps<C, U> & {
	children?: FormikConfig<C | U>['children'];
	initialValuesCreate: C;
	validationSchemaCreate: FormikConfig<C>['validationSchema'];
	validationSchemaUpdate: FormikConfig<U>['validationSchema'];
};

export function MyFormik<C, U>(props: MyFormikProps<C, U>) {
	if (props.type === 'create') {
		return (
			<Formik
				onSubmit={props.onCreate}
				initialValues={props.initialValuesCreate}
				validationSchema={props.validationSchemaCreate}
			>
				{props.children}
			</Formik>
		);
	}

	return (
		<Formik
			onSubmit={props.onUpdate}
			initialValues={props.initialValues}
			validationSchema={props.validationSchemaUpdate}
		>
			{props.children}
		</Formik>
	);
}
