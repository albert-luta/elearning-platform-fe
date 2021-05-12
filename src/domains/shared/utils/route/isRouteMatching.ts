import { pathToRegexp } from 'path-to-regexp';
import { Route } from '../../constants/Routes';

export const isRouteMatching = (
	route: string,
	routesToMatch: Route | Route[]
): boolean => {
	if (!Array.isArray(routesToMatch)) {
		const regexp = pathToRegexp(routesToMatch.path);

		return regexp.test(route);
	}

	for (const routeToMatch of routesToMatch) {
		const regexp = pathToRegexp(routeToMatch.path);

		if (regexp.test(route)) return true;
	}
	return false;
};
