import { pathToRegexp } from 'path-to-regexp';

export const isRouteMatching = (
	route: string,
	routesToMatch: string | string[]
) => {
	if (typeof routesToMatch === 'string') {
		const regexp = pathToRegexp(routesToMatch);

		return regexp.test(route);
	}

	for (const routeToMatch of routesToMatch) {
		const regexp = pathToRegexp(routeToMatch);

		if (regexp.test(route)) return true;
	}
	return false;
};
