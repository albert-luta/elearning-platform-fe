import { createResourceUpdate } from 'domains/course/graphql/updates/createResourceUpdate';
import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { useCreateResourceMutation } from 'generated/graphql';
import { FC, memo } from 'react';
import { CreateActivityProps } from '../BaseActivityForm';
import { CreateResourceFormValues, ResourceForm } from './ResourceForm';

export const CreateResourceForm: FC<CreateActivityProps> = memo(
	function CreateResourceForm({ courseId, sectionId, onSuccess }) {
		const [createResource] = useCreateResourceMutation({
			update: createResourceUpdate(courseId)
		});
		const handleCreateResource = useFormikSubmit<CreateResourceFormValues>(
			async ({ files, ...data }) => {
				const res = await createResource({
					variables: {
						data: {
							sectionId,
							...data
						},
						files: Object.values(files)
					}
				});
				if (!res.data) return;

				onSuccess();
			}
		);

		return <ResourceForm type="create" onCreate={handleCreateResource} />;
	}
);
