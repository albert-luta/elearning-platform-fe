import { createSectionUpdate } from 'domains/course/graphql/updates/createSectionUpdate';
import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { useCreateSectionMutation } from 'generated/graphql';
import { FC, memo } from 'react';
import { CreateSectionFormValues, SectionForm } from './SectionForm';

interface CreateSectionFormProps {
	courseId: string;
	onSuccess: () => void;
}

export const CreateSectionForm: FC<CreateSectionFormProps> = memo(
	function CreateSectionForm({ courseId, onSuccess }) {
		const [createSection] = useCreateSectionMutation({
			update: createSectionUpdate
		});
		const handleCreateSection = useFormikSubmit<CreateSectionFormValues>(
			async (data) => {
				const res = await createSection({
					variables: {
						data: {
							courseId,
							...data
						}
					}
				});
				if (!res.data) return;

				onSuccess();
			}
		);

		return <SectionForm type="create" onCreate={handleCreateSection} />;
	}
);
