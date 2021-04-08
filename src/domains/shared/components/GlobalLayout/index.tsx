import { Theme, useMediaQuery } from '@material-ui/core';
import { RoutesGroups } from 'domains/shared/constants/Routes';
import { isRouteMatching } from 'domains/shared/utils/isRouteMatching';
import { useRouter } from 'next/router';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { GlobalAppBar } from './GlobalAppBar';
import { GlobalDrawer } from './GlobalDrawer';
import { MainContent } from './MainContent';

export const GlobalLayout: FC = memo(function GlobalLayout({ children }) {
	const { pathname } = useRouter();

	const [hideDrawer, setHideDrawer] = useState(
		isRouteMatching(pathname, RoutesGroups.NO_DRAWER)
	);
	useEffect(() => {
		if (isRouteMatching(pathname, RoutesGroups.NO_DRAWER)) {
			setHideDrawer(true);
		} else {
			setHideDrawer(false);
		}
	}, [pathname]);

	const isDesktopDrawer = useMediaQuery((theme: Theme) =>
		theme.breakpoints.up('lg')
	);

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
	const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

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
				{children}
			</MainContent>
		</>
	);
});
