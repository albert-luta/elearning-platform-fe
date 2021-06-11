import { ButtonWithLoader } from 'domains/shared/components/buttons/ButtonWithLoader';
import { FormVerticalLayout } from 'domains/shared/components/form/FormVerticalLayout';
import { MyFormik } from 'domains/shared/components/form/MyFormik';
import { FormErrors } from 'domains/shared/constants/FormErrors';
import { FormProps } from 'domains/shared/types/form';
import { Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { FC, memo } from 'react';
import * as Yup from 'yup';

export interface CreateCourseFormValues {
	name: string;
}
export type UpdateCourseFormValues = CreateCourseFormValues;

const initialValuesCreate: CreateCourseFormValues = {
	name: ''
};

const createCourseValidationSchema: Yup.SchemaOf<CreateCourseFormValues> = Yup.object(
	{
		name: Yup.string().trim().required(FormErrors.REQUIRED)
	}
);
const updateCourseValidationSchema: Yup.SchemaOf<UpdateCourseFormValues> = createCourseValidationSchema.clone();

type CourseFormProps = FormProps<
	CreateCourseFormValues,
	UpdateCourseFormValues
>;

export const CourseForm: FC<CourseFormProps> = memo(function CourseForm(props) {
	return (
		<MyFormik
			{...props}
			initialValuesCreate={initialValuesCreate}
			validationSchemaCreate={createCourseValidationSchema}
			validationSchemaUpdate={updateCourseValidationSchema}
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
