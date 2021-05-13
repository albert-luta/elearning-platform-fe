import { ButtonWithLoader } from 'domains/shared/components/buttons/ButtonWithLoader';
import {
	FileUpload,
	FileUploadProps
} from 'domains/shared/components/form/FileUpload';
import { FormVerticalLayout } from 'domains/shared/components/form/FormVerticalLayout';
import { FileType } from 'domains/shared/constants/file/FileType';
import { FormErrors } from 'domains/shared/constants/FormErrors';
import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useCreateUniversityMutation } from 'generated/graphql';
import { FC, memo } from 'react';
import * as yup from 'yup';
import { createUniversityUpdate } from '../graphql/updates/createUniversityUpdate';
import { useRouter } from 'next/router';
import { composeDynamicRoute } from 'domains/shared/utils/route/composeDynamicRoute';
import { Routes } from 'domains/shared/constants/Routes';
import { composeLabel } from 'domains/shared/utils/form/composeLabel';

interface Values {
	name: string;
	logo: Record<string, File>;
}

const initialValues: Values = {
	name: '',
	logo: {}
};

const validationSchema = yup.object().shape({
	name: yup.string().trim().required(FormErrors.REQUIRED),
	logo: yup.object()
});

interface CreateUniversityFormProps {
	onSuccess: () => void;
}

export const CreateUniversityForm: FC<CreateUniversityFormProps> = memo(
	function CreateUniversityForm({ onSuccess }) {
		const router = useRouter();
		const [createUniversity] = useCreateUniversityMutation({
			update: createUniversityUpdate
		});
		const handleCreateUniversity = useFormikSubmit<Values>(
			async ({ name, logo }) => {
				const res = await createUniversity({
					variables: {
						university: {
							name
						},
						logo: Object.values(logo)[0]
					}
				});
				if (!res.data) return;

				onSuccess();
				router.push(
					composeDynamicRoute(Routes.university.DASHBOARD.path, {
						universityId: res.data.createUniversity.id
					})
				);
			}
		);

		return (
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleCreateUniversity}
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
									Create
								</ButtonWithLoader>
							}
						/>
					</Form>
				)}
			</Formik>
		);
	}
);
