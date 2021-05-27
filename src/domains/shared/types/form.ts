import { FormikHelpers } from 'formik';

export type FormikSubmitFn<V> = (
	values: V,
	formikHelpers: FormikHelpers<V>
) => void | Promise<void>;

export interface FormCreateProps<C> {
	type: 'create';
	onCreate: FormikSubmitFn<C>;
}
export interface FormUpdateProps<U> {
	type: 'update';
	onUpdate: FormikSubmitFn<U>;
	initialValues: U;
}
export type FormTypes =
	| FormCreateProps<any>['type']
	| FormUpdateProps<any>['type'];
export type FormProps<C, U> = FormCreateProps<C> | FormUpdateProps<U>;
