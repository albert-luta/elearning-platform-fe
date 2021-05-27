import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { normalizeUpdateFormInitialValues } from 'domains/shared/utils/form/normalizeUpdateFormInitialValues';
import {
	UniversityObject,
	useUpdateUniversityMutation
} from 'generated/graphql';
import { FC, memo } from 'react';
import { UniversityForm, UpdateUniversityFormValues } from './UniversityForm';

interface UpdateUniversityFormProps {
	university: UniversityObject;
	onSuccess: () => void;
}

export const UpdateUniversityForm: FC<UpdateUniversityFormProps> = memo(
	function UpdateUniversityForm({ university, onSuccess }) {
		const [updateUniversity] = useUpdateUniversityMutation();
		const handleUpdateUniversity = useFormikSubmit<UpdateUniversityFormValues>(
			async ({ logo, ...data }) => {
				const res = await updateUniversity({
					variables: {
						id: university.id,
						data,
						logo: Object.values(logo)[0]
					}
				});
				if (!res.data) return;

				onSuccess();
			}
		);

		return (
			<UniversityForm
				type="update"
				initialValues={{
					...normalizeUpdateFormInitialValues(university),
					logo: {}
				}}
				onUpdate={handleUpdateUniversity}
			/>
		);
	}
);
