import { IconButton, Toolbar, Tooltip } from '@material-ui/core';
import { ArrowDropDown, Menu } from '@material-ui/icons';
import { FC, memo } from 'react';
import { usePopupState, bindTrigger } from 'material-ui-popup-state/hooks';
import { UserDropDownMenu } from './UserDropDownMenu';
import { AppBarStyled, EmptyMiddleSpace } from './index.styles';
import { UserButton } from './UserButton';
import { UniversityButton } from './UniversityButton';

interface GlobalAppBarProps {
	hideDrawerButton: boolean;
	isDesktopDrawer: boolean;
	isDrawerOpen: boolean;
	onDrawerOpen: () => void;
}

export const GlobalAppBar: FC<GlobalAppBarProps> = memo(function GlobalAppBar({
	hideDrawerButton,
	isDesktopDrawer,
	isDrawerOpen,
	onDrawerOpen
}) {
	const userMenuState = usePopupState({
		variant: 'popover',
		popupId: 'appBarUserMenu'
	});

	return (
		<>
			<AppBarStyled
				color="default"
				isDrawerOpen={isDrawerOpen}
				isDesktopDrawer={isDesktopDrawer}
			>
				<Toolbar>
					{!hideDrawerButton && !isDrawerOpen && (
						<Tooltip title="Drawer">
							<IconButton onClick={onDrawerOpen}>
								<Menu />
							</IconButton>
						</Tooltip>
					)}
					<Tooltip title="University Dashboard">
						<UniversityButton />
					</Tooltip>

					<EmptyMiddleSpace />

					<Tooltip title="User Dashboard">
						<UserButton />
					</Tooltip>
					<Tooltip title="Menu">
						<IconButton {...bindTrigger(userMenuState)}>
							<ArrowDropDown />
						</IconButton>
					</Tooltip>
				</Toolbar>
			</AppBarStyled>

			<UserDropDownMenu popupState={userMenuState} />
		</>
	);
});
