import { FC, memo } from 'react';
import { DrawerHeader, DrawerStyled } from '../index.styles';
import { DrawerContent } from './DrawerContent';

interface MenuDrawerProps {
	isDesktopDrawer: boolean;
	isOpen: boolean;
	onClose: () => void;
}

export const MenuDrawer: FC<MenuDrawerProps> = memo(function MenuDrawer({
	isDesktopDrawer,
	isOpen,
	onClose
}) {
	if (isDesktopDrawer) {
		return (
			<DrawerStyled desktop open={isOpen}>
				<DrawerHeader onClose={onClose} />
				<DrawerContent />
			</DrawerStyled>
		);
	}

	return (
		<DrawerStyled open={isOpen} onClose={onClose}>
			<DrawerHeader />
			<DrawerContent onClose={onClose} />
		</DrawerStyled>
	);
});
