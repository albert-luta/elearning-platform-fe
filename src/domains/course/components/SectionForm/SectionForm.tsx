import { ButtonWithLoader } from 'domains/shared/components/buttons/ButtonWithLoader';
import { FormVerticalLayout } from 'domains/shared/components/form/FormVerticalLayout';
import { MyFormik } from 'domains/shared/components/form/MyFormik';
import { FormErrors } from 'domains/shared/constants/FormErrors';
import { FormProps } from 'domains/shared/types/form';
import { Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { FC, memo } from 'react';
import * as Yup from 'yup';

export interface CreateSectionFormValues {
	name: string;
}
export type UpdateSectionFormValues = CreateSectionFormValues;

const initialValuesCreate: CreateSectionFormValues = {
	name: ''
};

const createSectionValidationSchema: Yup.SchemaOf<CreateSectionFormValues> = Yup.object(
	{
		name: Yup.string().trim().required(FormErrors.REQUIRED)
	}
);
const updateSectionValidationSchema: Yup.SchemaOf<UpdateSectionFormValues> = createSectionValidationSchema.clone();

type SectionFormProps = FormProps<
	CreateSectionFormValues,
	UpdateSectionFormValues
>;

export const SectionForm: FC<SectionFormProps> = memo(function SectionForm(
	props
) {
	return (
		<MyFormik
			{...props}
			initialValuesCreate={initialValuesCreate}
			validationSchemaCreate={createSectionValidationSchema}
			validationSchemaUpdate={updateSectionValidationSchema}
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
