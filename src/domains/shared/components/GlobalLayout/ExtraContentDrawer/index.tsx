import { FC, memo } from 'react';
import { DrawerHeader, DrawerStyled } from '../index.styles';
import { ExtraContentDrawerContent } from './ExtraContentDrawerContent';

interface ExtraContentDrawerProps {
	isDesktopDrawer: boolean;
	isOpen: boolean;
	onClose: () => void;
}

export const ExtraContentDrawer: FC<ExtraContentDrawerProps> = memo(
	function ExtraContentDrawer({ isDesktopDrawer, isOpen, onClose }) {
		if (isDesktopDrawer) {
			return (
				<DrawerStyled desktop open={isOpen} anchor="right">
					<DrawerHeader onClose={onClose} anchor="right" />
					<ExtraContentDrawerContent />
				</DrawerStyled>
			);
		}

		return (
			<DrawerStyled open={isOpen} onClose={onClose} anchor="right">
				<DrawerHeader anchor="right" />
				<ExtraContentDrawerContent />
			</DrawerStyled>
		);
	}
);
