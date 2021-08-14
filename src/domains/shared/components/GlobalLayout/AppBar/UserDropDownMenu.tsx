import { useReactiveVar } from '@apollo/client';
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
	Person,
	// Forum,
	AccountBalance
} from '@material-ui/icons';
import { Routes, RoutesGroups } from 'domains/shared/constants/Routes';
import { UserRole } from 'domains/shared/constants/UserRole';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import { composeDynamicRoute } from 'domains/shared/utils/route/composeDynamicRoute';
import { isRouteMatching } from 'domains/shared/utils/route/isRouteMatching';
import { selectedUniversityVar } from 'domains/university/reactiveVars';
import { useLogoutMutation } from 'generated/graphql';
import { PopupState, bindPopover } from 'material-ui-popup-state/core';
import { useRouter } from 'next/router';
import { FC, memo, useCallback, useEffect, useMemo } from 'react';
import { MenuLinkItem } from '../../list/MenuLinkItem';

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
			}
		}, [logout, popupState]);

		const [
			shouldShowUserUniversitySpecificButtons,
			showUserUniversitySpecificButtons,
			hideUserUniversitySpecificButtons
		] = useBooleanState();
		useEffect(() => {
			if (
				isRouteMatching(router.asPath, RoutesGroups.OUTSIDE_UNIVERSITY)
			) {
				hideUserUniversitySpecificButtons();
			} else {
				showUserUniversitySpecificButtons();
			}
		}, [
			router.asPath,
			showUserUniversitySpecificButtons,
			hideUserUniversitySpecificButtons
		]);

		const university = useReactiveVar(selectedUniversityVar);
		const shouldShowTeacherSpecificButtons = useMemo(
			() =>
				[UserRole.TEACHER, UserRole.ADMIN].includes(
					university?.role ?? UserRole.STUDENT
				),
			[university?.role]
		);

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
						button
					>
						<ListItemIcon>
							<Person />
						</ListItemIcon>
						<ListItemText primary="Profile" />
					</MenuLinkItem>
					<MenuLinkItem
						href={Routes.user.SETTINGS.path}
						onClick={popupState.close}
						button
					>
						<ListItemIcon>
							<Settings />
						</ListItemIcon>
						<ListItemText primary="Settings" />
					</MenuLinkItem>
				</MenuList>

				{shouldShowUserUniversitySpecificButtons && (
					<>
						<Divider />

						<MenuList>
							<MenuLinkItem
								href={composeDynamicRoute(
									Routes.userUniversity.GRADES.path,
									{
										universityId: String(
											router.query.universityId
										)
									}
								)}
								onClick={popupState.close}
								button
							>
								<ListItemIcon>
									<EventNote />
								</ListItemIcon>
								<ListItemText primary="Grades" />
							</MenuLinkItem>
							{/* <MenuLinkItem
								href={composeDynamicRoute(
									Routes.userUniversity.FORUM.path,
									{
										universityId: String(
											router.query.universityId
										)
									}
								)}
								onClick={popupState.close}
								button
							>
								<ListItemIcon>
									<Forum />
								</ListItemIcon>
								<ListItemText primary="Forum" />
							</MenuLinkItem> */}
							{shouldShowTeacherSpecificButtons && (
								<MenuLinkItem
									href={composeDynamicRoute(
										Routes.userUniversity.QUESTION_BANK
											.path,
										{
											universityId: String(
												router.query.universityId
											)
										}
									)}
									onClick={popupState.close}
									button
								>
									<ListItemIcon>
										<AccountBalance />
									</ListItemIcon>
									<ListItemText primary="Question Bank" />
								</MenuLinkItem>
							)}
							<MenuLinkItem
								href={composeDynamicRoute(
									Routes.userUniversity.UPCOMING_ACTIVITIES
										.path,
									{
										universityId: String(
											router.query.universityId
										)
									}
								)}
								onClick={popupState.close}
								button
							>
								<ListItemIcon>
									<DateRange />
								</ListItemIcon>
								<ListItemText primary="Upcoming activities" />
							</MenuLinkItem>
						</MenuList>
					</>
				)}

				<Divider />

				<MenuList>
					<MenuItem button onClick={handleLogout}>
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
