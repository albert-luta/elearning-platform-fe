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
import { FC, memo, useEffect, useMemo, useState } from 'react';
import { GlobalAppBar } from './GlobalAppBar';
import { GlobalDrawer } from './GlobalDrawer';
import { MainContent } from './MainContent';

const getContainerMaxWidth = (path: string): ContainerProps['maxWidth'] => {
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

	const [hideDrawer, setHideDrawer] = useState(
		isRouteMatching(router.asPath, RoutesGroups.NO_DRAWER)
	);

	const isDesktopDrawer = useMediaQuery((theme: Theme) =>
		theme.breakpoints.up('lg')
	);

	const [isDrawerOpen, openDrawer, closeDrawer] = useBooleanState();

	useEffect(() => {
		if (isRouteMatching(router.asPath, RoutesGroups.NO_DRAWER)) {
			setHideDrawer(true);
			closeDrawer();
		} else {
			setHideDrawer(false);
		}
	}, [router.asPath, closeDrawer]);

	const content = useMemo(() => {
		const maxWidth = getContainerMaxWidth(router.asPath);

		if (maxWidth == null) {
			return <>{children}</>;
		} else {
			return (
				<Container maxWidth={maxWidth} disableGutters>
					<>{children}</>
				</Container>
			);
		}
	}, [router.asPath, children]);

	if (isRouteMatching(router.asPath, RoutesGroups.PUBLIC)) {
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
