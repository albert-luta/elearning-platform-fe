import { TextField } from 'formik-material-ui';
import { ButtonWithLoader } from 'domains/shared/components/buttons/ButtonWithLoader';
import { FormVerticalLayout } from 'domains/shared/components/form/FormVerticalLayout';
import { MyFormik } from 'domains/shared/components/form/MyFormik';
import { FormErrors } from 'domains/shared/constants/FormErrors';
import { FormProps } from 'domains/shared/types/form';
import { Field, Form } from 'formik';
import { FC, memo } from 'react';
import * as Yup from 'yup';
import {
	BaseActivityFormFields,
	baseActivityInitialValuesCreate,
	CreateBaseActivityFormValues,
	createBaseActivityValidationSchema,
	UpdateBaseActivityFormValues,
	updateBaseActivityValidationSchema
} from '../BaseActivityForm';
import { DateTimePicker } from 'formik-material-ui-pickers';

export interface CreateAssignmentFormValues
	extends CreateBaseActivityFormValues {
	deadline: Date;
	points: number;
}
export type UpdateAssignmentFormValues = CreateAssignmentFormValues &
	Omit<UpdateBaseActivityFormValues, keyof CreateAssignmentFormValues>;

const initialValuesCreate: CreateAssignmentFormValues = {
	...baseActivityInitialValuesCreate,
	deadline: new Date(),
	points: 0
};

const createAdditions = {
	deadline: Yup.date()
		.min(
			new Date(),
			({ min }) => FormErrors.MIN_DATE + (min as Date).toLocaleString()
		)
		.required(FormErrors.REQUIRED),
	points: Yup.number()
		.min(0, ({ min }) => FormErrors.MIN_NUMBER + min)
		.required(FormErrors.REQUIRED)
};
const createAssignmentValidationSchema: Yup.SchemaOf<CreateAssignmentFormValues> = createBaseActivityValidationSchema
	.clone()
	.shape(createAdditions)
	.defined();
const updateAssignmentValidationSchema: Yup.SchemaOf<UpdateAssignmentFormValues> = updateBaseActivityValidationSchema
	.clone()
	.shape(createAdditions)
	.defined();

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
				{({ isSubmitting }) => (
					<Form>
						<FormVerticalLayout
							fields={
								<>
									<BaseActivityFormFields />
									<Field
										component={TextField}
										name="points"
										label="Points"
										type="number"
										fullWidth
									/>
									<Field
										component={DateTimePicker}
										name="deadline"
										label="Deadline"
										ampm={false}
										disablePast
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
