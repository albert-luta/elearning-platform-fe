import { ActivityType } from 'generated/graphql';
import { Routes } from '../constants/Routes';

export const getActivityRoute = (
	type: ActivityType
): keyof typeof Routes.activity => {
	switch (type) {
		case ActivityType.Resource:
			return 'RESOURCE_DASHBOARD';
		case ActivityType.Assignment:
			return 'ASSIGNMENT_DASHBOARD';
		case ActivityType.Quiz:
			return 'QUIZ_DASHBOARD';
		case ActivityType.Forum:
		default:
			return 'FORUM_DASHBOARD';
	}
};
