import { MenuItem, MenuItemProps } from '@material-ui/core';
import { FC, memo } from 'react';
import { NextLinkComposed, NextLinkComposedProps } from '../NextLinkComposed';
import styled from 'styled-components';

const NextLinkComposedOverwriteMui = styled(NextLinkComposed)`
	&& {
		padding: 0;
		min-height: 0;
	}
`;

type MenuLinkItemProps = Omit<MenuItemProps, 'button'> &
	NextLinkComposedProps & {
		button?: true | undefined;
	};

export const MenuLinkItem: FC<MenuLinkItemProps> = memo(function MenuLinkItem({
	href,
	linkProps,
	children,
	...menuItemProps
}) {
	return (
		<MenuItem {...menuItemProps}>
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
