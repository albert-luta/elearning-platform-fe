import { TextField } from 'formik-material-ui';
import { FormVerticalLayout } from 'domains/shared/components/form/FormVerticalLayout';
import { MyFormik } from 'domains/shared/components/form/MyFormik';
import { Field, Form } from 'formik';
import { FC, memo } from 'react';
import { ButtonWithLoader } from 'domains/shared/components/buttons/ButtonWithLoader';
import * as Yup from 'yup';
import { FormErrors } from 'domains/shared/constants/FormErrors';
import { FormProps } from 'domains/shared/types/form';

export interface CreateQuestionCategoryFormValues {
	name: string;
}
export type UpdateQuestionCategoryFormValues = CreateQuestionCategoryFormValues;

const initialValuesCreate: CreateQuestionCategoryFormValues = {
	name: ''
};

const createQuestionCategoryValidationSchema: Yup.SchemaOf<CreateQuestionCategoryFormValues> = Yup.object(
	{
		name: Yup.string().trim().required(FormErrors.REQUIRED)
	}
);
const updateQuestionCategoryValidationSchema: Yup.SchemaOf<UpdateQuestionCategoryFormValues> = createQuestionCategoryValidationSchema.clone();

type QuestionCategoryFormProps = FormProps<
	CreateQuestionCategoryFormValues,
	UpdateQuestionCategoryFormValues
>;

export const QuestionCategoryForm: FC<QuestionCategoryFormProps> = memo(
	function QuestionCategoryForm(props) {
		return (
			<MyFormik
				{...props}
				initialValuesCreate={initialValuesCreate}
				validationSchemaCreate={createQuestionCategoryValidationSchema}
				validationSchemaUpdate={updateQuestionCategoryValidationSchema}
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
