import { MenuItem, MenuItemProps } from '@material-ui/core';
import { FC, memo } from 'react';
import { NextLinkComposedProps } from '../NextLinkComposed';
import { NextLinkComposedOverwriteMui } from './NextLinkComposedOverwriteMui';

type MenuLinkItemProps = MenuItemProps & NextLinkComposedProps;

export const MenuLinkItem: FC<MenuLinkItemProps> = memo(function MenuLinkItem({
	href,
	linkProps,
	children,
	button,
	...menuItemProps
}) {
	return (
		<MenuItem {...menuItemProps} button={button as any}>
			<NextLinkComposedOverwriteMui
				linkProps={linkProps}
				href={href}
				className="MuiButtonBase-root MuiListItem-root MuiMenuItem-root"
			>
				{children}
			</NextLinkComposedOverwriteMui>
		</MenuItem>
	);
});
