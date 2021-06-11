import { createCollegeUpdate } from 'domains/college/graphql/updates/createCollegeUpdate';
import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { useCreateCollegeMutation } from 'generated/graphql';
import { FC, memo } from 'react';
import { CollegeForm, CreateCollegeFormValues } from './CollegeForm';

interface CreateCollegeFormProps {
	onSuccess: () => void;
}

export const CreateCollegeForm: FC<CreateCollegeFormProps> = memo(
	function CreateCollegeForm({ onSuccess }) {
		const [createCollege] = useCreateCollegeMutation({
			update: createCollegeUpdate
		});
		const handleCreateCollege = useFormikSubmit<CreateCollegeFormValues>(
			async (data) => {
				const res = await createCollege({
					variables: {
						data
					}
				});
				if (!res.data) return;

				onSuccess();
			}
		);

		return <CollegeForm type="create" onCreate={handleCreateCollege} />;
	}
);
