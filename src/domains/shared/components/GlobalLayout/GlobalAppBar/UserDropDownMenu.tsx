import {
	Divider,
	ListItemIcon,
	ListItemText,
	MenuItem,
	MenuList,
	Popover
} from '@material-ui/core';
import {
	Settings,
	MeetingRoom,
	EventNote,
	DateRange,
	Person
} from '@material-ui/icons';
import { Routes } from 'domains/shared/constants/Routes';
import { useLogoutMutation } from 'generated/graphql';
import { PopupState, bindPopover } from 'material-ui-popup-state/core';
import { useRouter } from 'next/router';
import { FC, memo, useCallback, useEffect } from 'react';
import { MenuLinkItem } from '../../menu/MenuLinkItem';

interface UserDropDownMenuProps {
	popupState: PopupState;
}

export const UserDropDownMenu: FC<UserDropDownMenuProps> = memo(
	function UserDropDownMenu({ popupState }) {
		const router = useRouter();

		useEffect(() => {
			router.prefetch(Routes.auth.LOGIN_REGISTER.path);
		}, [router]);

		const [logout] = useLogoutMutation({ fetchPolicy: 'no-cache' });
		const handleLogout = useCallback(async () => {
			try {
				await logout();
			} catch {
				popupState.close();
				router.push(Routes.auth.LOGIN_REGISTER.path);
			}
		}, [logout, popupState, router]);

		return (
			<Popover
				{...bindPopover(popupState)}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
			>
				<MenuList>
					<MenuLinkItem
						href={Routes.user.PROFILE.path}
						onClick={popupState.close}
					>
						<ListItemIcon>
							<Person />
						</ListItemIcon>
						<ListItemText primary="Profile" />
					</MenuLinkItem>
					<MenuLinkItem
						href={Routes.user.GRADES.path}
						onClick={popupState.close}
					>
						<ListItemIcon>
							<EventNote />
						</ListItemIcon>
						<ListItemText primary="Grades" />
					</MenuLinkItem>
					<MenuLinkItem
						href={Routes.user.CALENDAR.path}
						onClick={popupState.close}
					>
						<ListItemIcon>
							<DateRange />
						</ListItemIcon>
						<ListItemText primary="Calendar" />
					</MenuLinkItem>
					<MenuLinkItem
						href={Routes.user.SETTINGS.path}
						onClick={popupState.close}
					>
						<ListItemIcon>
							<Settings />
						</ListItemIcon>
						<ListItemText primary="Settings" />
					</MenuLinkItem>
				</MenuList>

				<Divider />

				<MenuList>
					<MenuItem onClick={handleLogout}>
						<ListItemIcon>
							<MeetingRoom />
						</ListItemIcon>
						<ListItemText primary="Logout" />
					</MenuItem>
				</MenuList>
			</Popover>
		);
	}
);
