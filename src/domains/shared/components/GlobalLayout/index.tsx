import {
	Container,
	ContainerProps,
	Theme,
	useMediaQuery
} from '@material-ui/core';
import { RoutesGroups } from 'domains/shared/constants/Routes';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import { isRouteMatching } from 'domains/shared/utils/route/isRouteMatching';
import { useRouter } from 'next/router';
import { FC, memo, useEffect, useMemo } from 'react';
import { ExtraContentDrawer } from './ExtraContentDrawer';
import { AppBar } from './AppBar';
import { MenuDrawer } from './MenuDrawer';
import { MainContent } from './MainContent';

const getContainerMaxWidth = (
	path: string
): ContainerProps['maxWidth'] | undefined => {
	let maxWidth: ContainerProps['maxWidth'];
	if (isRouteMatching(path, RoutesGroups.SMALL_CONTENT_WIDTH)) {
		maxWidth = 'sm';
	} else if (isRouteMatching(path, RoutesGroups.MEDIUM_CONTENT_WIDTH)) {
		maxWidth = 'md';
	}

	return maxWidth;
};

export const GlobalLayout: FC = memo(function GlobalLayout({ children }) {
	const router = useRouter();

	const [
		shouldHideMenuDrawer,
		hideMenuDrawer,
		showMenuDrawer
	] = useBooleanState(
		isRouteMatching(router.asPath, RoutesGroups.MENU_DRAWER_NOT_VISIBLE)
	);
	const isMenuDrawerDesktop = useMediaQuery((theme: Theme) =>
		theme.breakpoints.up('lg')
	);
	const [
		isMenuDrawerOpen,
		openMenuDrawer,
		closeMenuDrawer
	] = useBooleanState();
	useEffect(() => {
		if (
			isRouteMatching(router.asPath, RoutesGroups.MENU_DRAWER_NOT_VISIBLE)
		) {
			hideMenuDrawer();
			closeMenuDrawer();
		} else {
			showMenuDrawer();
		}
	}, [router.asPath, closeMenuDrawer, hideMenuDrawer, showMenuDrawer]);

	const [
		shouldShowExtraContentDrawer,
		showExtraContentDrawer,
		hideExtraContentDrawer
	] = useBooleanState(
		isRouteMatching(
			router.asPath,
			RoutesGroups.EXTRA_CONTENT_DRAWER_VISIBLE
		)
	);
	const isExtraContentDrawerDesktop = useMediaQuery((theme: Theme) =>
		theme.breakpoints.up('lg')
	);
	const [
		isExtraContentDrawerOpen,
		openExtraContentDrawer,
		closeExtraContentDrawer
	] = useBooleanState();
	useEffect(() => {
		if (
			isRouteMatching(
				router.asPath,
				RoutesGroups.EXTRA_CONTENT_DRAWER_VISIBLE
			)
		) {
			showExtraContentDrawer();
			// TODO: open it just on desktop
			openExtraContentDrawer();
		} else {
			hideExtraContentDrawer();
			closeExtraContentDrawer();
		}
	}, [router.asPath, closeExtraContentDrawer, hideExtraContentDrawer, showExtraContentDrawer, openExtraContentDrawer]);

	const content = useMemo(() => {
		const maxWidth = getContainerMaxWidth(router.asPath);

		if (maxWidth == null) {
			return <>{children}</>;
		}

		return (
			<Container maxWidth={maxWidth} disableGutters>
				<>{children}</>
			</Container>
		);
	}, [router.asPath, children]);

	if (isRouteMatching(router.asPath, RoutesGroups.PUBLIC)) {
		return <>{children}</>;
	}

	return (
		<>
			<AppBar
				// Menu
				hideMenuDrawerButton={shouldHideMenuDrawer}
				isMenuDrawerDesktop={isMenuDrawerDesktop}
				isMenuDrawerOpen={isMenuDrawerOpen}
				onMenuDrawerOpen={openMenuDrawer}
				// Extra content
				showExtraContentDrawerButton={shouldShowExtraContentDrawer}
				isExtraContentDrawerDesktop={isExtraContentDrawerDesktop}
				isExtraContentDrawerOpen={isExtraContentDrawerOpen}
				onExtraContentDrawerOpen={openExtraContentDrawer}
			/>
			{!shouldHideMenuDrawer && (
				<MenuDrawer
					isDesktopDrawer={isMenuDrawerDesktop}
					isOpen={isMenuDrawerOpen}
					onClose={closeMenuDrawer}
				/>
			)}
			<MainContent
				// Menu
				isMenuDrawerOpen={isMenuDrawerOpen}
				isMenuDrawerDesktop={isMenuDrawerDesktop}
				// Extra content
				isExtraContentDrawerOpen={isExtraContentDrawerOpen}
				isExtraContentDrawerDesktop={isExtraContentDrawerDesktop}
			>
				{content}
			</MainContent>
			{shouldShowExtraContentDrawer && (
				<ExtraContentDrawer
					isDesktopDrawer={isExtraContentDrawerDesktop}
					isOpen={isExtraContentDrawerOpen}
					onClose={closeExtraContentDrawer}
				/>
			)}
		</>
	);
});
