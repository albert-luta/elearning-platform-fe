import { MutationUpdaterFn } from '@apollo/client';
import { DeleteUniversityMutation } from 'generated/graphql';
import { removeUniversity } from './removeUniversity';

export const deleteUniversityUpdate: MutationUpdaterFn<DeleteUniversityMutation> = (
	cache,
	{ data }
): void => {
	if (!data) return;

	removeUniversity(cache, data.deleteUniversity);
};
