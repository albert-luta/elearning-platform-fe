import { ListItem, ListItemProps } from '@material-ui/core';
import { FC, memo } from 'react';
import { NextLinkComposedProps } from '../NextLinkComposed';
import { NextLinkComposedOverwriteMui } from './NextLinkComposedOverwriteMui';

type ListLinkItemProps = ListItemProps & NextLinkComposedProps;

export const ListLinkItem: FC<ListLinkItemProps> = memo(function ListLinkItem({
	href,
	linkProps,
	children,
	button,
	...listItemProps
}) {
	return (
		<ListItem {...listItemProps} button={button as any}>
			<NextLinkComposedOverwriteMui
				linkProps={linkProps}
				href={href}
				className="MuiButtonBase-root MuiListItem-root MuiMenuItem-root"
			>
				{children}
			</NextLinkComposedOverwriteMui>
		</ListItem>
	);
});
