import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { composeLabel } from 'domains/shared/utils/form/composeLabel';
import {
	FileUpload,
	FileUploadProps
} from 'domains/shared/components/form/FileUpload';
import { FormErrors } from 'domains/shared/constants/FormErrors';
import { yupMap } from 'domains/shared/utils/form/yupMap';
import { FC, memo } from 'react';
import * as Yup from 'yup';
import { DefinedStringSchema } from 'yup/lib/string';
import { Box } from '@material-ui/core';

export interface CreateBaseActivityFormValues {
	name: string;
	description: string;
	files: Record<string, File>;
}
export type UpdateBaseActivityFormValues = CreateBaseActivityFormValues;

export const baseActivityInitialValuesCreate: CreateBaseActivityFormValues = {
	name: '',
	description: '',
	files: {}
};

export const createBaseActivityValidationSchema: Yup.SchemaOf<CreateBaseActivityFormValues> = Yup.object(
	{
		name: Yup.string().trim().required(FormErrors.REQUIRED),
		description: Yup.string().trim() as DefinedStringSchema<string>,
		files: yupMap(Yup.mixed<File>().required())
	}
);
export const updateBaseActivityValidationSchema: Yup.SchemaOf<UpdateBaseActivityFormValues> = createBaseActivityValidationSchema.clone();

export interface CreateActivityProps {
	courseId: string;
	sectionId: string;
	onSuccess: () => void;
}

interface BaseActivityFormFieldsProps {
	setFieldValue: (field: string, value: any) => void;
}
export const BaseActivityFormFields: FC<BaseActivityFormFieldsProps> = memo(
	function BaseActivityFormFields({ setFieldValue }) {
		return (
			<>
				<Box pb={2}>
					<Field
						component={TextField}
						name="name"
						label="Name"
						fullWidth
					/>
				</Box>
				<Box pb={2}>
					<Field
						component={TextField}
						name="description"
						label={composeLabel('Description', 'optional')}
						fullWidth
						multiline
					/>
				</Box>
				<Field name="files">
					{({
						field: { value }
					}: {
						field: {
							value: FileUploadProps['newFiles'];
						};
					}) => (
						<FileUpload
							label={composeLabel('Files', 'optional')}
							newFiles={value}
							onNewFilesUpdate={(getUpdatedFiles) => {
								setFieldValue('files', getUpdatedFiles(value));
							}}
						/>
					)}
				</Field>
			</>
		);
	}
);
