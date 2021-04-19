import { useReactiveVar } from '@apollo/client';
import { Routes, RoutesGroups } from 'domains/shared/constants/Routes';
import { isBrowser } from 'domains/shared/utils/isBrowser';
import { isRouteMatching } from 'domains/shared/utils/isRouteMatching';
import { NextRouter, useRouter } from 'next/router';
import { FC, memo } from 'react';
import { accessTokenVar } from '../reactiveVars';

const redirect = (path: string, router: NextRouter): null => {
	if (isBrowser()) {
		try {
			router.push(path);
		} catch (e) {
			window.location.href = path;
		}
	}

	return null;
};

export const ProtectRoutes: FC = memo(function ProtectRoutes({ children }) {
	const router = useRouter();
	const accessToken = useReactiveVar(accessTokenVar);
	const isAuthenticated = !!accessToken;

	if (isAuthenticated && router.pathname === Routes.auth.LOGIN_REGISTER) {
		return redirect(Routes.user.DASHBOARD, router);
	} else if (
		!isAuthenticated &&
		!isRouteMatching(router.pathname, RoutesGroups.PUBLIC)
	) {
		return redirect(Routes.auth.LOGIN_REGISTER, router);
	}

	return <>{children}</>;
});
