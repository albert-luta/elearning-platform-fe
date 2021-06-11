import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { normalizeUpdateFormInitialValues } from 'domains/shared/utils/form/normalizeUpdateFormInitialValues';
import { CollegeObject, useUpdateCollegeMutation } from 'generated/graphql';
import { FC, memo } from 'react';
import { CollegeForm, UpdateCollegeFormValues } from './CollegeForm';

interface UpdateCollegeFormProps {
	college: CollegeObject;
	onSuccess: () => void;
}

export const UpdateCollegeForm: FC<UpdateCollegeFormProps> = memo(
	function UpdateCollegeForm({ college, onSuccess }) {
		const [updateCollege] = useUpdateCollegeMutation();
		const handleUpdateCollege = useFormikSubmit<UpdateCollegeFormValues>(
			async (data) => {
				const res = await updateCollege({
					variables: {
						id: college.id,
						data
					}
				});
				if (!res.data) return;

				onSuccess();
			}
		);

		const { courses, ...initialValues } = normalizeUpdateFormInitialValues(
			college
		);

		return (
			<CollegeForm
				type="update"
				initialValues={initialValues}
				onUpdate={handleUpdateCollege}
			/>
		);
	}
);
