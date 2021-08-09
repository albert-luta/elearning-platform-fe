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
	createBaseActivityValidationSchema,
	UpdateBaseActivityFormValues,
	updateBaseActivityValidationSchema
} from '../BaseActivityForm';

export type CreateQuizFormValues = CreateBaseActivityFormValues;
export type UpdateQuizFormValues = CreateQuizFormValues &
	Omit<UpdateBaseActivityFormValues, keyof CreateQuizFormValues>;

const initialValuesCreate: CreateQuizFormValues = {
	...baseActivityInitialValuesCreate
};

const createQuizValidationSchema: Yup.SchemaOf<CreateQuizFormValues> = createBaseActivityValidationSchema.clone();
const updateQuizValidationSchema: Yup.SchemaOf<UpdateQuizFormValues> = updateBaseActivityValidationSchema.clone();

type QuizFormProps = FormProps<CreateQuizFormValues, UpdateQuizFormValues>;

export const QuizForm: FC<QuizFormProps> = memo(function QuizForm(props) {
	return (
		<MyFormik
			{...props}
			initialValuesCreate={initialValuesCreate}
			validationSchemaCreate={createQuizValidationSchema}
			validationSchemaUpdate={updateQuizValidationSchema}
		>
			{({ isSubmitting }) => (
				<Form>
					<FormVerticalLayout
						fields={
							<>
								<BaseActivityFormFields />
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

// TODO: display time limit in minutes(fixed) - convert to ms when sending/from ms when receiving(at update)
// TODO: use react-beautiful-dnd and an order number for questions
