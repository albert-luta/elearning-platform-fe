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
import { BaseActivityFieldsFragment } from 'generated/graphql';

export interface CreateBaseActivityFormValues {
	name: string;
	description: string;
	files: Record<string, File>;
}
export interface UpdateBaseActivityFormValues
	extends CreateBaseActivityFormValues {
	oldFiles: string[];
	filesToDelete: Record<string, true>;
}

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
export const updateBaseActivityValidationSchema: Yup.SchemaOf<UpdateBaseActivityFormValues> = createBaseActivityValidationSchema
	.clone()
	.shape({
		oldFiles: Yup.array().of(Yup.string().trim().required()).required(),
		filesToDelete: yupMap(Yup.boolean().required())
	});

export interface CreateActivityProps {
	courseId: string;
	sectionId: string;
	onSuccess: () => void;
}
export interface UpdateActivityProps {
	activity: BaseActivityFieldsFragment;
	onSuccess: () => void;
}

export const BaseActivityFormFields: FC = memo(
	function BaseActivityFormFields() {
		return (
			<>
				<Box pb={1}>
					<Field
						component={TextField}
						name="name"
						label="Name"
						fullWidth
					/>
				</Box>
				<Box pb={1}>
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
						field: { value },
						form: {
							values: { oldFiles, filesToDelete },
							setFieldValue
						}
					}: {
						field: {
							value: FileUploadProps['newFiles'];
						};
						form: {
							values: { [key: string]: any };
							setFieldValue: (field: string, value: any) => void;
						};
					}) => (
						<FileUpload
							label={composeLabel('Files', 'optional')}
							newFiles={value}
							onNewFilesUpdate={(getUpdatedFiles) => {
								setFieldValue('files', getUpdatedFiles(value));
							}}
							oldFiles={oldFiles}
							filesToDelete={filesToDelete}
							onFilesToDeleteUpdate={(getUpdatedFiles) => {
								setFieldValue(
									'filesToDelete',
									getUpdatedFiles(filesToDelete)
								);
							}}
						/>
					)}
				</Field>
			</>
		);
	}
);
