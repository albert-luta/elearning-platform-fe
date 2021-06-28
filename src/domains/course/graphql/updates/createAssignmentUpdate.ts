import { MutationUpdaterFn } from '@apollo/client';
import { CreateAssignmentMutation } from 'generated/graphql';
import { createActivityUpdate } from './createActivityUpdate';

export const createAssignmentUpdate = (
	courseId: string
): MutationUpdaterFn<CreateAssignmentMutation> => (cache, { data }) => {
	if (!data) return;

	createActivityUpdate(cache, data.createAssignment, courseId);
};
