import { ButtonWithLoader } from 'domains/shared/components/buttons/ButtonWithLoader';
import { FormVerticalLayout } from 'domains/shared/components/form/FormVerticalLayout';
import { MyFormik } from 'domains/shared/components/form/MyFormik';
import { FormErrors } from 'domains/shared/constants/FormErrors';
import { FormProps } from 'domains/shared/types/form';
import { Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { FC, memo } from 'react';
import * as Yup from 'yup';

export interface CreateForumCommentFormValues {
	text: string;
}
export type UpdateForumCommentFormValues = CreateForumCommentFormValues;

const initialValuesCreate: CreateForumCommentFormValues = {
	text: ''
};

const createForumCommentValidationSchema: Yup.SchemaOf<CreateForumCommentFormValues> = Yup.object(
	{
		text: Yup.string().trim().required(FormErrors.REQUIRED)
	}
);
const updateForumCommentValidationSchema: Yup.SchemaOf<UpdateForumCommentFormValues> = createForumCommentValidationSchema.clone();

type ForumCommentFormProps = FormProps<
	CreateForumCommentFormValues,
	UpdateForumCommentFormValues
>;

export const ForumCommentForm: FC<ForumCommentFormProps> = memo(
	function ForumCommentForm(props) {
		return (
			<MyFormik
				{...props}
				initialValuesCreate={initialValuesCreate}
				validationSchemaCreate={createForumCommentValidationSchema}
				validationSchemaUpdate={updateForumCommentValidationSchema}
			>
				{({ isSubmitting }) => (
					<Form>
						<FormVerticalLayout
							fields={
								<Field
									component={TextField}
									name="text"
									label="Text"
									fullWidth
									multiline
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
									{props.type === 'create' ? 'Add' : 'Update'}
								</ButtonWithLoader>
							}
						/>
					</Form>
				)}
			</MyFormik>
		);
	}
);
