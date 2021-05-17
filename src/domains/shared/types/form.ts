import { FormikHelpers } from 'formik';

export type FormikSubmitFn<V> = (
	values: V,
	formikHelpers: FormikHelpers<V>
) => void | Promise<void>;

export type FormType = 'create' | 'update';
