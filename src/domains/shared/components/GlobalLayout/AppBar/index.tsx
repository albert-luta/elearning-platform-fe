import { IconButton, Toolbar, Tooltip } from '@material-ui/core';
import { ArrowDropDown, ChevronLeft, Menu } from '@material-ui/icons';
import { FC, memo, useEffect, useState } from 'react';
import { usePopupState, bindTrigger } from 'material-ui-popup-state/hooks';
import { UserDropDownMenu } from './UserDropDownMenu';
import { AppBarStyled, EmptyMiddleSpace } from './index.styles';
import { UserButton } from './UserButton';
import { UniversityButton } from './UniversityButton';
import { useRouter } from 'next/router';
import { isRouteMatching } from 'domains/shared/utils/route/isRouteMatching';
import { Routes } from 'domains/shared/constants/Routes';

interface AppBarProps {
	// Menu
	hideMenuDrawerButton: boolean;
	isMenuDrawerDesktop: boolean;
	isMenuDrawerOpen: boolean;
	onMenuDrawerOpen: () => void;
	// Extra content
	showExtraContentDrawerButton: boolean;
	isExtraContentDrawerDesktop: boolean;
	isExtraContentDrawerOpen: boolean;
	onExtraContentDrawerOpen: () => void;
}

export const AppBar: FC<AppBarProps> = memo(function AppBar({
	hideMenuDrawerButton,
	isMenuDrawerDesktop,
	isMenuDrawerOpen,
	onMenuDrawerOpen,
	showExtraContentDrawerButton,
	isExtraContentDrawerDesktop,
	isExtraContentDrawerOpen,
	onExtraContentDrawerOpen
}) {
	const userMenuState = usePopupState({
		variant: 'popover',
		popupId: 'appBarUserMenu'
	});

	const router = useRouter();
	const [isQuizActive, setIsQuizActive] = useState(
		isRouteMatching(router.asPath, Routes.activity.QUIZ_ACTIVE)
	);
	useEffect(() => {
		if (isRouteMatching(router.asPath, Routes.activity.QUIZ_ACTIVE)) {
			setIsQuizActive(true);
		} else {
			setIsQuizActive(false);
		}
	}, [router.asPath]);

	return (
		<>
			<AppBarStyled
				color="default"
				isMenuDrawerOpen={isMenuDrawerOpen}
				isMenuDrawerDesktop={isMenuDrawerDesktop}
				isExtraContentDrawerOpen={isExtraContentDrawerOpen}
				isExtraContentDrawerDesktop={isExtraContentDrawerDesktop}
			>
				<Toolbar>
					{!isQuizActive && (
						<>
							{!hideMenuDrawerButton && !isMenuDrawerOpen && (
								<Tooltip title="Drawer">
									<IconButton onClick={onMenuDrawerOpen}>
										<Menu />
									</IconButton>
								</Tooltip>
							)}
							<Tooltip title="University Dashboard">
								<UniversityButton />
							</Tooltip>
						</>
					)}

					<EmptyMiddleSpace />

					{!isQuizActive && (
						<>
							<Tooltip title="User Dashboard">
								<UserButton />
							</Tooltip>
							<Tooltip title="Menu">
								<IconButton {...bindTrigger(userMenuState)}>
									<ArrowDropDown />
								</IconButton>
							</Tooltip>
						</>
					)}
					{showExtraContentDrawerButton && !isExtraContentDrawerOpen && (
						<Tooltip title="More Actions">
							<IconButton onClick={onExtraContentDrawerOpen}>
								<ChevronLeft />
							</IconButton>
						</Tooltip>
					)}
				</Toolbar>
			</AppBarStyled>

			<UserDropDownMenu popupState={userMenuState} />
		</>
	);
});
