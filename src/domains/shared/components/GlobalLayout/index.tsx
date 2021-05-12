import { Theme, useMediaQuery } from '@material-ui/core';
import { Routes, RoutesGroups } from 'domains/shared/constants/Routes';
import { useOpenState } from 'domains/shared/hooks/useOpenState';
import { isRouteMatching } from 'domains/shared/utils/route/isRouteMatching';
import { UserRoutesContentLayout } from 'domains/user/components/UserRoutesContentLayout';
import { useRouter } from 'next/router';
import { FC, memo, useEffect, useMemo, useState } from 'react';
import { GlobalAppBar } from './GlobalAppBar';
import { GlobalDrawer } from './GlobalDrawer';
import { MainContent } from './MainContent';

export const GlobalLayout: FC = memo(function GlobalLayout({ children }) {
	const { pathname } = useRouter();

	const [hideDrawer, setHideDrawer] = useState(
		isRouteMatching(pathname, RoutesGroups.NO_DRAWER)
	);

	const isDesktopDrawer = useMediaQuery((theme: Theme) =>
		theme.breakpoints.up('lg')
	);

	const [isDrawerOpen, openDrawer, closeDrawer] = useOpenState();

	useEffect(() => {
		if (isRouteMatching(pathname, RoutesGroups.NO_DRAWER)) {
			setHideDrawer(true);
			closeDrawer();
		} else {
			setHideDrawer(false);
		}
	}, [pathname, closeDrawer]);

	const content = useMemo(() => {
		if (isRouteMatching(pathname, Object.values(Routes.user))) {
			return (
				<UserRoutesContentLayout>{children}</UserRoutesContentLayout>
			);
		}

		return <>{children}</>;
	}, [pathname, children]);

	if (isRouteMatching(pathname, RoutesGroups.PUBLIC)) {
		return <>{children}</>;
	}

	return (
		<>
			<GlobalAppBar
				hideDrawerButton={hideDrawer}
				isDesktopDrawer={isDesktopDrawer}
				isDrawerOpen={isDrawerOpen}
				onDrawerOpen={openDrawer}
			/>
			{!hideDrawer && (
				<GlobalDrawer
					isDesktopDrawer={isDesktopDrawer}
					isOpen={isDrawerOpen}
					onClose={closeDrawer}
				/>
			)}
			<MainContent
				isDrawerOpen={isDrawerOpen}
				isDesktopDrawer={isDesktopDrawer}
			>
				{content}
			</MainContent>
		</>
	);
});
