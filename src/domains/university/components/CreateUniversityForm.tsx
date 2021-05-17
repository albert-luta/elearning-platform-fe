import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { useCreateUniversityMutation } from 'generated/graphql';
import { FC, memo } from 'react';
import { createUniversityUpdate } from '../graphql/updates/createUniversityUpdate';
import { useRouter } from 'next/router';
import { composeDynamicRoute } from 'domains/shared/utils/route/composeDynamicRoute';
import { Routes } from 'domains/shared/constants/Routes';
import { UniversityForm, UniversityFormValues } from './UniversityForm';

interface CreateUniversityFormProps {
	onSuccess: () => void;
}

export const CreateUniversityForm: FC<CreateUniversityFormProps> = memo(
	function CreateUniversityForm({ onSuccess }) {
		const router = useRouter();
		const [createUniversity] = useCreateUniversityMutation({
			update: createUniversityUpdate
		});
		const handleCreateUniversity = useFormikSubmit<UniversityFormValues>(
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
			<UniversityForm type="create" onSubmit={handleCreateUniversity} />
		);
	}
);
