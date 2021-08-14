import { createForumUpdate } from 'domains/course/graphql/updates/createForumUpdate';
import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { useCreateForumMutation } from 'generated/graphql';
import { FC, memo } from 'react';
import { CreateActivityProps } from '../BaseActivityForm';
import { CreateForumFormValues, ForumForm } from './ForumForm';

export const CreateForumForm: FC<CreateActivityProps> = memo(
	function CreateForumForm({ courseId, sectionId, onSuccess }) {
		const [createForum] = useCreateForumMutation({
			update: createForumUpdate(courseId)
		});
		const handleCreateForum = useFormikSubmit<CreateForumFormValues>(
			async ({ files, ...data }) => {
				const res = await createForum({
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

		return <ForumForm type="create" onCreate={handleCreateForum} />;
	}
);
