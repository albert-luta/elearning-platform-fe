import { compile } from 'path-to-regexp';

export const composeDynamicRoute = (
	route: string,
	params: Record<string, string | number>
): string => {
	const toRoute = compile(route, { encode: encodeURIComponent });

	return toRoute(params);
};
