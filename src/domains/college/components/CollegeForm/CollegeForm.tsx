import { ButtonWithLoader } from 'domains/shared/components/buttons/ButtonWithLoader';
import { FormVerticalLayout } from 'domains/shared/components/form/FormVerticalLayout';
import { MyFormik } from 'domains/shared/components/form/MyFormik';
import { FormErrors } from 'domains/shared/constants/FormErrors';
import { FormProps } from 'domains/shared/types/form';
import { Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { FC, memo } from 'react';
import * as Yup from 'yup';

export interface CreateCollegeFormValues {
	name: string;
}
export type UpdateCollegeFormValues = CreateCollegeFormValues;

const initialValuesCreate: CreateCollegeFormValues = {
	name: ''
};

const createCollegeValidationSchema: Yup.SchemaOf<CreateCollegeFormValues> = Yup.object(
	{
		name: Yup.string().trim().required(FormErrors.REQUIRED)
	}
);
const updateCollegeValidationSchema: Yup.SchemaOf<UpdateCollegeFormValues> = createCollegeValidationSchema.clone();

type CollegeFormProps = FormProps<
	CreateCollegeFormValues,
	UpdateCollegeFormValues
>;

export const CollegeForm: FC<CollegeFormProps> = memo(function CollegeForm(
	props
) {
	return (
		<MyFormik
			{...props}
			initialValuesCreate={initialValuesCreate}
			validationSchemaCreate={createCollegeValidationSchema}
			validationSchemaUpdate={updateCollegeValidationSchema}
		>
			{({ isSubmitting }) => (
				<Form>
					<FormVerticalLayout
						fields={
							<Field
								component={TextField}
								name="name"
								label="Name"
								fullWidth
							/>
						}
						actions={
							<ButtonWithLoader
								variant="contained"
								color="primary"
								fullWidth
								loading={isSubmitting}
								type="submit"
							>
								{props.type === 'create' ? 'Create' : 'Update'}
							</ButtonWithLoader>
						}
					/>
				</Form>
			)}
		</MyFormik>
	);
});
