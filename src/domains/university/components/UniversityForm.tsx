import { ButtonWithLoader } from 'domains/shared/components/buttons/ButtonWithLoader';
import {
	FileUpload,
	FileUploadProps
} from 'domains/shared/components/form/FileUpload';
import { FormVerticalLayout } from 'domains/shared/components/form/FormVerticalLayout';
import { FileType } from 'domains/shared/constants/file/FileType';
import { FormErrors } from 'domains/shared/constants/FormErrors';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { FC, memo } from 'react';
import * as yup from 'yup';
import { composeLabel } from 'domains/shared/utils/form/composeLabel';
import { FormikSubmitFn, FormType } from 'domains/shared/types/form';

export interface UniversityFormValues {
	name: string;
	logo: Record<string, File>;
}

const initialValues: UniversityFormValues = {
	name: '',
	logo: {}
};

const createUniversityValidationSchema = yup.object().shape({
	name: yup.string().trim().required(FormErrors.REQUIRED),
	logo: yup.object()
});
const updateUniversityValidationSchema = yup.object().shape({
	name: yup.string().trim(),
	logo: yup.object()
});

interface UniversityFormProps {
	onSubmit: FormikSubmitFn<UniversityFormValues>;
	type: FormType;
}

export const UniversityForm: FC<UniversityFormProps> = memo(
	function UniversityForm({ onSubmit, type }) {
		return (
			<Formik
				initialValues={initialValues}
				validationSchema={
					type === 'create'
						? createUniversityValidationSchema
						: updateUniversityValidationSchema
				}
				onSubmit={onSubmit}
			>
				{({ isSubmitting, setFieldValue }) => (
					<Form>
						<FormVerticalLayout
							fields={
								<>
									<Field
										component={TextField}
										name="name"
										label={
											type === 'create'
												? 'Name'
												: composeLabel(
														'Name',
														'optional'
												  )
										}
										fullWidth
									/>
									<Field name="logo">
										{({
											field: { value }
										}: {
											field: {
												value: FileUploadProps['files'];
											};
										}) => (
											<FileUpload
												label={composeLabel(
													'Logo',
													'optional'
												)}
												helperText="Recommended image size: 40x40px"
												files={value}
												onChange={(getUpdatedFiles) => {
													setFieldValue(
														'logo',
														getUpdatedFiles(value)
													);
												}}
												maxFiles={1}
												maxFileSize={10}
												acceptedFileTypes={[
													FileType.IMAGE
												]}
											/>
										)}
									</Field>
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
									{type === 'create' ? 'Create' : 'Update'}
								</ButtonWithLoader>
							}
						/>
					</Form>
				)}
			</Formik>
		);
	}
);
