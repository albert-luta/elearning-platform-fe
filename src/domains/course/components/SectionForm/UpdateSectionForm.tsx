import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { normalizeUpdateFormInitialValues } from 'domains/shared/utils/form/normalizeUpdateFormInitialValues';
import { SectionObject, useUpdateSectionMutation } from 'generated/graphql';
import { FC, memo } from 'react';
import { SectionForm, UpdateSectionFormValues } from './SectionForm';

interface UpdateSectionFormProps {
	section: SectionObject;
	onSuccess: () => void;
}

export const UpdateSectionForm: FC<UpdateSectionFormProps> = memo(
	function UpdateSectionForm({ section, onSuccess }) {
		const [updateSection] = useUpdateSectionMutation();
		const handleUpdateSection = useFormikSubmit<UpdateSectionFormValues>(
			async (data) => {
				const res = await updateSection({
					variables: {
						id: section.id,
						data: {
							courseId: section.courseId,
							...data
						}
					}
				});
				if (!res.data) return;

				onSuccess();
			}
		);

		const {
			createdAt,
			activities,
			...normalizedInitialValues
		} = normalizeUpdateFormInitialValues(section);

		return (
			<SectionForm
				type="update"
				initialValues={normalizedInitialValues}
				onUpdate={handleUpdateSection}
			/>
		);
	}
);
