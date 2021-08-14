import { MutationUpdaterFn } from '@apollo/client';
import {
	CreateForumCommentMutation,
	ForumCommentsDocument,
	ForumCommentsQuery
} from 'generated/graphql';

export const createForumCommentUpdate: MutationUpdaterFn<CreateForumCommentMutation> = (
	cache,
	{ data }
) => {
	if (!data) return;
	const forumCommentsIdentification = {
		query: ForumCommentsDocument,
		variables: {
			forumId: data.createForumComment.forumId
		}
	};
	const prevForumComments = cache.readQuery<ForumCommentsQuery>(
		forumCommentsIdentification
	);
	if (!prevForumComments) return;

	const nextForumComments = [
		...prevForumComments.forumComments,
		data.createForumComment
	];

	cache.writeQuery<ForumCommentsQuery>({
		...forumCommentsIdentification,
		data: {
			__typename: prevForumComments?.__typename,
			forumComments: nextForumComments
		}
	});
};
