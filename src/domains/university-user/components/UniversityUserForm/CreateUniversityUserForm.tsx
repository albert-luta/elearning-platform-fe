import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { createUniversityUserUpdate } from 'domains/university-user/graphql/updates/createUniversityUserUpdate';
import { useCreateUniversityUserMutation } from 'generated/graphql';
import { FC, memo } from 'react';
import {
	CreateUniversityUserFormValues,
	UniversityUserForm
} from './UniversityUserForm';

interface CreateUniversityUserFormProps {
	onSuccess: () => void;
}

export const CreateUniversityUserForm: FC<CreateUniversityUserFormProps> = memo(
	function CreateUniversityUserForm({ onSuccess }) {
		const [createUniversityUser] = useCreateUniversityUserMutation({
			update: createUniversityUserUpdate
		});
		const handleCreateUniversityUser = useFormikSubmit<CreateUniversityUserFormValues>(
			async ({ collegesToEnrollAt, ...data }) => {
				const res = await createUniversityUser({
					variables: {
						data: {
							...data,
							collegesToEnrollAt: collegesToEnrollAt.map(
								({ name, coursesToEnrollAt, ...college }) => ({
									...college,
									coursesToEnrollAt: coursesToEnrollAt.map(
										({ name, ...course }) => course
									)
								})
							)
						}
					}
				});
				if (!res.data) return;

				onSuccess();
			}
		);

		return (
			<UniversityUserForm
				type="create"
				onCreate={handleCreateUniversityUser}
			/>
		);
	}
);
