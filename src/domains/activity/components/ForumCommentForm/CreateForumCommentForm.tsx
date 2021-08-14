import { createForumCommentUpdate } from 'domains/activity/graphql/updates/createForumCommentUpdate';
import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { useCreateForumCommentMutation } from 'generated/graphql';
import { FC, memo } from 'react';
import {
	CreateForumCommentFormValues,
	ForumCommentForm
} from './ForumCommentForm';

interface CreateForumCommentFormProps {
	forumId: string;
	onSuccess: () => void;
}

export const CreateForumCommentForm: FC<CreateForumCommentFormProps> = memo(
	function CreateForumCommentForm({ forumId, onSuccess }) {
		const [createForumComment] = useCreateForumCommentMutation({
			update: createForumCommentUpdate
		});
		const handleCreateForumComment = useFormikSubmit<CreateForumCommentFormValues>(
			async (data) => {
				const res = await createForumComment({
					variables: {
						forumId,
						data
					}
				});
				if (!res.data) return;

				onSuccess();
			}
		);

		return (
			<ForumCommentForm
				type="create"
				onCreate={handleCreateForumComment}
			/>
		);
	}
);
