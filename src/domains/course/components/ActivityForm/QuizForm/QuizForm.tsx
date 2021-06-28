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

export type CreateQuizFormValues = CreateBaseActivityFormValues;
export type UpdateQuizFormValues = CreateQuizFormValues;

const initialValuesCreate: CreateQuizFormValues = {
	...baseActivityInitialValuesCreate
};

const createQuizValidationSchema: Yup.SchemaOf<CreateQuizFormValues> = createBaseActivityValidationSchema.clone();
const updateQuizValidationSchema: Yup.SchemaOf<UpdateQuizFormValues> = createQuizValidationSchema.clone();

type QuizFormProps = FormProps<CreateQuizFormValues, UpdateQuizFormValues>;

export const QuizForm: FC<QuizFormProps> = memo(function QuizForm(props) {
	return (
		<MyFormik
			{...props}
			initialValuesCreate={initialValuesCreate}
			validationSchemaCreate={createQuizValidationSchema}
			validationSchemaUpdate={updateQuizValidationSchema}
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
