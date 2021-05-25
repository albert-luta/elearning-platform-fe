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
import * as yup from 'yup';
import { composeLabel } from 'domains/shared/utils/form/composeLabel';
import { FormikSubmitFn } from 'domains/shared/types/form';
import { yupMap } from 'domains/shared/utils/form/yupMap';
import { MyFormik } from 'domains/shared/components/form/MyFormik';

export interface UniversityFormValues {
	name: string;
	logo: Record<string, File>;
}
export type UpdateUniversityFormValues = UniversityFormValues & {
	inPlus: string;
};

const createInitialValues: UniversityFormValues = {
	name: '',
	logo: {}
};

const createUniversityValidationSchema: yup.SchemaOf<UniversityFormValues> = yup.object(
	{
		name: yup.string().trim().required(FormErrors.REQUIRED),
		logo: yupMap(yup.mixed<File>().required())
	}
);
const updateUniversityValidationSchema: yup.SchemaOf<UpdateUniversityFormValues> = createUniversityValidationSchema
	.clone()
	.shape({
		inPlus: yup.string().required()
	});

type UniversityFormProps =
	| {
			type: 'create';
			onSubmit: FormikSubmitFn<UniversityFormValues>;
	  }
	| {
			type: 'update';
			onSubmit: FormikSubmitFn<UpdateUniversityFormValues>;
			initialValues: UpdateUniversityFormValues;
	  };

export const UniversityForm: FC<UniversityFormProps> = memo(
	function UniversityForm(props) {
		return (
			<MyFormik
				type={props.type}
				createProps={{
					initialValues: createInitialValues,
					validationSchema: createUniversityValidationSchema,
					onSubmit: props.onSubmit
				}}
				updateProps={{
					initialValues: props.initialValues,
					validationSchema: updateUniversityValidationSchema,
					onSubmit: props.onSubmit
				}}
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
											props.type === 'create'
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
