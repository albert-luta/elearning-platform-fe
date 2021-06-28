import { MutationUpdaterFn } from '@apollo/client';
import { CreateResourceMutation } from 'generated/graphql';
import { createActivityUpdate } from './createActivityUpdate';

export const createResourceUpdate = (
	courseId: string
): MutationUpdaterFn<CreateResourceMutation> => (cache, { data }) => {
	if (!data) return;

	createActivityUpdate(cache, data.createResource, courseId);
};
