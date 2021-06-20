import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { useCreateUniversityMutation } from 'generated/graphql';
import { FC, memo } from 'react';
import { createUniversityUpdate } from '../../graphql/updates/createUniversityUpdate';
import { UniversityForm, CreateUniversityFormValues } from './UniversityForm';

interface CreateUniversityFormProps {
	onSuccess: (universityId: string) => void;
}

export const CreateUniversityForm: FC<CreateUniversityFormProps> = memo(
	function CreateUniversityForm({ onSuccess }) {
		const [createUniversity] = useCreateUniversityMutation({
			update: createUniversityUpdate
		});
		const handleCreateUniversity = useFormikSubmit<CreateUniversityFormValues>(
			async ({ logo, ...data }) => {
				const res = await createUniversity({
					variables: {
						data,
						logo: Object.values(logo)[0]
					}
				});
				if (!res.data) return;

				onSuccess(res.data.createUniversity.id);
			}
		);

		return (
			<UniversityForm type="create" onCreate={handleCreateUniversity} />
		);
	}
);
