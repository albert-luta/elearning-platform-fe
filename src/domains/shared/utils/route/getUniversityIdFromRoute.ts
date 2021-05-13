import { pathToRegexp } from 'path-to-regexp';
import { Routes } from '../../constants/Routes';

export const getUniversityIdFromRoute = (route: string): string | null => {
	const universityRouteRegexp = pathToRegexp(
		Routes.university.DASHBOARD.path + '/:optional*'
	);
	const res = universityRouteRegexp.exec(route);

	if (res) return res[1];
	return null;
};
