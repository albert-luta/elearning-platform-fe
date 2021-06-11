import { ButtonWithLoader } from 'domains/shared/components/buttons/ButtonWithLoader';
import {
	FileUpload,
	FileUploadProps
} from 'domains/shared/components/form/FileUpload';
import { FormVerticalLayout } from 'domains/shared/components/form/FormVerticalLayout';
import { FileType } from 'domains/shared/constants/file/FileType';
import { FormErrors } from 'domains/shared/constants/FormErrors';
import { Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { FC, memo } from 'react';
import * as Yup from 'yup';
import { composeLabel } from 'domains/shared/utils/form/composeLabel';
import { FormProps } from 'domains/shared/types/form';
import { yupMap } from 'domains/shared/utils/form/yupMap';
import { MyFormik } from 'domains/shared/components/form/MyFormik';

export interface CreateUniversityFormValues {
	name: string;
	logo: Record<string, File>;
}
export type UpdateUniversityFormValues = CreateUniversityFormValues;

const initialValuesCreate: CreateUniversityFormValues = {
	name: '',
	logo: {}
};

const createUniversityValidationSchema: Yup.SchemaOf<CreateUniversityFormValues> = Yup.object(
	{
		name: Yup.string().trim().required(FormErrors.REQUIRED),
		logo: yupMap(Yup.mixed<File>().required())
	}
);
const updateUniversityValidationSchema: Yup.SchemaOf<UpdateUniversityFormValues> = createUniversityValidationSchema.clone();

type UniversityFormProps = FormProps<
	CreateUniversityFormValues,
	UpdateUniversityFormValues
>;

export const UniversityForm: FC<UniversityFormProps> = memo(
	function UniversityForm(props) {
		return (
			<MyFormik
				{...props}
				initialValuesCreate={initialValuesCreate}
				validationSchemaCreate={createUniversityValidationSchema}
				validationSchemaUpdate={updateUniversityValidationSchema}
			>
				{({ isSubmitting, setFieldValue }) => (
					<Form>
						<FormVerticalLayout
							fields={
								<>
									<Field
										component={TextField}
										name="name"
										label="Name"
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
