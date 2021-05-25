import { FormType } from 'domains/shared/types/form';
import { Formik, FormikConfig } from 'formik';
import { memo, ReactNode } from 'react';

interface MyFormikProps<C, U> {
	type: FormType;
	createProps: FormikConfig<C>;
	updateProps: FormikConfig<U>;
	children: ReactNode;
}

export const MyFormik = memo(function MyFormik<C, U>({
	type,
	createProps,
	updateProps,
	children
}: MyFormikProps<C, U>) {
	if (type === 'create') {
		return <Formik {...createProps}>{children}</Formik>;
	}

	return <Formik {...updateProps}>{children}</Formik>;
});
