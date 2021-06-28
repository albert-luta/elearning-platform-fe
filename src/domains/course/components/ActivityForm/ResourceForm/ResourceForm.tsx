import { ButtonWithLoader } from 'domains/shared/components/buttons/ButtonWithLoader';
import { FormVerticalLayout } from 'domains/shared/components/form/FormVerticalLayout';
import { MyFormik } from 'domains/shared/components/form/MyFormik';
import { FormProps } from 'domains/shared/types/form';
import { Form } from 'formik';
import { FC, memo } from 'react';
import * as Yup from 'yup';
import {
	BaseActivityFormFields,
	baseActivityInitialValuesCreate,
	CreateBaseActivityFormValues,
	createBaseActivityValidationSchema
} from '../BaseActivityForm';

export type CreateResourceFormValues = CreateBaseActivityFormValues;
export type UpdateResourceFormValues = CreateResourceFormValues;

const initialValuesCreate: CreateResourceFormValues = {
	...baseActivityInitialValuesCreate
};

const createResourceValidationSchema: Yup.SchemaOf<CreateResourceFormValues> = createBaseActivityValidationSchema.clone();
const updateResourceValidationSchema: Yup.SchemaOf<UpdateResourceFormValues> = createResourceValidationSchema.clone();

type ResourceFormProps = FormProps<
	CreateResourceFormValues,
	UpdateResourceFormValues
>;

export const ResourceForm: FC<ResourceFormProps> = memo(function ResourceForm(
	props
) {
	return (
		<MyFormik
			{...props}
			initialValuesCreate={initialValuesCreate}
			validationSchemaCreate={createResourceValidationSchema}
			validationSchemaUpdate={updateResourceValidationSchema}
		>
			{({ isSubmitting, setFieldValue }) => (
				<Form>
					<FormVerticalLayout
						fields={
							<>
								<BaseActivityFormFields
									setFieldValue={setFieldValue}
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
								{props.type === 'create' ? 'Create' : 'Update'}
							</ButtonWithLoader>
						}
					/>
				</Form>
			)}
		</MyFormik>
	);
});
