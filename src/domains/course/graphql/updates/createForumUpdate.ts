import { MutationUpdaterFn } from '@apollo/client';
import { CreateForumMutation } from 'generated/graphql';
import { createActivityUpdate } from './createActivityUpdate';

export const createForumUpdate = (
	courseId: string
): MutationUpdaterFn<CreateForumMutation> => (cache, { data }) => {
	if (!data) return;

	createActivityUpdate(cache, data.createForum, courseId);
};
