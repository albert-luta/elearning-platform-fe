import { useReactiveVar } from '@apollo/client';
import { NextRouter, useRouter } from 'next/router';
import { FC, memo } from 'react';
import { accessTokenVar } from '../reactive-vars';

const PUBLIC_ROUTES = ['/', '/app/auth'];

const redirect = (path: string, router: NextRouter) => {
	if (typeof window !== 'undefined') {
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

	if (isAuthenticated && router.pathname === '/app/auth') {
		return redirect('/app', router);
	} else if (!isAuthenticated && !PUBLIC_ROUTES.includes(router.pathname)) {
		return redirect('/app/auth', router);
	}

	return <>{children}</>;
});
