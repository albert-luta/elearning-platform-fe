import { FormikHelpers } from 'formik';
import { FormikSubmitFn } from '../types/form';
import { toFormikErrors } from '../utils/form/toFormikErrors';

type FormikInjectFn<V> = (
	values: V,
	formikHelpers: FormikHelpers<V>
) => any | Promise<any>;
type FormikCatchFn<V> = (
	e: any,
	values: V,
	formikHelpers: FormikHelpers<V>
) => any | Promise<any>;

export const useFormikSubmit = <V>(
	tryFn: FormikInjectFn<V>,
	catchFn?: FormikCatchFn<V>,
	finallyFn?: FormikInjectFn<V>
): FormikSubmitFn<V> => {
	return async (values: V, formikHelpers: FormikHelpers<V>) => {
		try {
			await tryFn(values, formikHelpers);
		} catch (e) {
			formikHelpers.setErrors(toFormikErrors(e));
			await catchFn?.(e, values, formikHelpers);
		} finally {
			formikHelpers.setSubmitting(false);
			await finallyFn?.(values, formikHelpers);
		}
	};
};
