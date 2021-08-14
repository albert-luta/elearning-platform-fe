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

export type CreateForumFormValues = CreateBaseActivityFormValues;
export type UpdateForumFormValues = CreateForumFormValues &
	Omit<UpdateBaseActivityFormValues, keyof CreateForumFormValues>;

const initialValuesCreate: CreateForumFormValues = {
	...baseActivityInitialValuesCreate
};

const createForumValidationSchema: Yup.SchemaOf<CreateForumFormValues> = createBaseActivityValidationSchema.clone();
const updateForumValidationSchema: Yup.SchemaOf<UpdateForumFormValues> = updateBaseActivityValidationSchema.clone();

type ForumFormProps = FormProps<CreateForumFormValues, UpdateForumFormValues>;

export const ForumForm: FC<ForumFormProps> = memo(function ForumForm(props) {
	return (
		<MyFormik
			{...props}
			initialValuesCreate={initialValuesCreate}
			validationSchemaCreate={createForumValidationSchema}
			validationSchemaUpdate={updateForumValidationSchema}
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
