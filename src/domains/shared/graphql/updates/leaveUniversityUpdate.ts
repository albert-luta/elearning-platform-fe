import { MutationUpdaterFn } from '@apollo/client';
import { LeaveUniversityMutation } from 'generated/graphql';
import { removeUniversity } from './removeUniversity';

export const leaveUniversityUpdate: MutationUpdaterFn<LeaveUniversityMutation> = (
	cache,
	{ data }
): void => {
	if (!data) return;

	removeUniversity(cache, data.leaveUniversity);
};
