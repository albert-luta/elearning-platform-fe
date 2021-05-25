import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { useUpdateUniversityMutation } from 'generated/graphql';
import { FC, memo } from 'react';
import { UniversityForm, UniversityFormValues } from './UniversityForm';

interface UpdateUniversityFormProps {
	id: string;
	onSuccess: () => void;
}

export const UpdateUniversityForm: FC<UpdateUniversityFormProps> = memo(
	function UpdateUniversityForm({ id, onSuccess }) {
		const [updateUniversity] = useUpdateUniversityMutation();
		const handleUpdateUniversity = useFormikSubmit<UniversityFormValues>(
			async ({ logo, ...data }) => {
				const res = await updateUniversity({
					variables: {
						id,
						data,
						logo: Object.values(logo)[0]
					}
				});
				if (!res.data) return;

				onSuccess();
			}
		);

		return (
			<UniversityForm type="update" onSubmit={handleUpdateUniversity} />
		);
	}
);
