import { MutationUpdaterFn } from '@apollo/client';
import { CreateQuizMutation } from 'generated/graphql';
import { createActivityUpdate } from './createActivityUpdate';

export const createQuizUpdate = (
	courseId: string
): MutationUpdaterFn<CreateQuizMutation> => (cache, { data }) => {
	if (!data) return;

	createActivityUpdate(cache, data.createQuiz, courseId);
};
