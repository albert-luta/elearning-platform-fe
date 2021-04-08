import { Toolbar } from '@material-ui/core';
import { LayoutMeasurements } from 'domains/shared/constants/LayoutMeasurements';
import { FC, memo } from 'react';
import styled from 'styled-components';
import { drawerTransitionMixin } from './index.styles';

interface MainContentProps {
	isDesktopDrawer: boolean;
	isDrawerOpen: boolean;
}

const MainStyled = styled.main<MainContentProps>`
	overflow-x: hidden;
	padding: ${({ theme }) => theme.spacing(2)}px;

	${({ isDrawerOpen }) => drawerTransitionMixin(isDrawerOpen, 'margin-left')}

	${({ isDesktopDrawer, isDrawerOpen }) =>
		isDesktopDrawer &&
		isDrawerOpen &&
		`margin-left: ${LayoutMeasurements.drawers.desktop.WIDTH};`}
`;
export const MainContent: FC<MainContentProps> = memo(function MainContent({
	isDesktopDrawer,
	isDrawerOpen,
	children
}) {
	return (
		<>
			<Toolbar />
			<MainStyled
				isDrawerOpen={isDrawerOpen}
				isDesktopDrawer={isDesktopDrawer}
			>
				{children}
			</MainStyled>
		</>
	);
});
