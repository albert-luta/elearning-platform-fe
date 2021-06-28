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

export type CreateAssignmentFormValues = CreateBaseActivityFormValues;
export type UpdateAssignmentFormValues = CreateAssignmentFormValues;

const initialValuesCreate: CreateAssignmentFormValues = {
	...baseActivityInitialValuesCreate
};

const createAssignmentValidationSchema: Yup.SchemaOf<CreateAssignmentFormValues> = createBaseActivityValidationSchema.clone();
const updateAssignmentValidationSchema: Yup.SchemaOf<UpdateAssignmentFormValues> = createAssignmentValidationSchema.clone();

type AssignmentFormProps = FormProps<
	CreateAssignmentFormValues,
	UpdateAssignmentFormValues
>;

export const AssignmentForm: FC<AssignmentFormProps> = memo(
	function AssignmentForm(props) {
		return (
			<MyFormik
				{...props}
				initialValuesCreate={initialValuesCreate}
				validationSchemaCreate={createAssignmentValidationSchema}
				validationSchemaUpdate={updateAssignmentValidationSchema}
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
									{props.type === 'create'
										? 'Create'
										: 'Update'}
								</ButtonWithLoader>
							}
						/>
					</Form>
				)}
			</MyFormik>
		);
	}
);
