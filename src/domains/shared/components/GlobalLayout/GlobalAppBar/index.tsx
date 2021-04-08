import { IconButton, Toolbar, Typography } from '@material-ui/core';
import { AccountCircle, ArrowDropDown, Menu } from '@material-ui/icons';
import { FC, memo } from 'react';
import { ButtonLink } from '../../buttons/ButtonLink';
import { usePopupState, bindTrigger } from 'material-ui-popup-state/hooks';
import { UserDropDownMenu } from './UserDropDownMenu';
import {
	AccountImgContainer,
	AppBarStyled,
	EmptyMiddleSpace
} from './index.styles';
import { Routes } from 'domains/shared/constants/Routes';

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
						<IconButton onClick={onDrawerOpen}>
							<Menu />
						</IconButton>
					)}

					<EmptyMiddleSpace />

					<ButtonLink
						href={Routes.user.DASHBOARD}
						style={{ textTransform: 'none' }}
					>
						<Typography variant="body1">Luta Albert</Typography>
						<AccountImgContainer>
							<AccountCircle fontSize="large" />
						</AccountImgContainer>
					</ButtonLink>
					<IconButton {...bindTrigger(userMenuState)}>
						<ArrowDropDown />
					</IconButton>
				</Toolbar>
			</AppBarStyled>

			<UserDropDownMenu popupState={userMenuState} />
		</>
	);
});
