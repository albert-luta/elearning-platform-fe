import { FC, memo } from 'react';
import { DrawerContent } from './DrawerContent';
import { DrawerStyled, DrawerHeader } from './index.styles';

interface GlobalDrawerProps {
	isDesktopDrawer: boolean;
	isOpen: boolean;
	onClose: () => void;
}

export const GlobalDrawer: FC<GlobalDrawerProps> = memo(function GlobalDrawer({
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
			<DrawerContent />
		</DrawerStyled>
	);
});
