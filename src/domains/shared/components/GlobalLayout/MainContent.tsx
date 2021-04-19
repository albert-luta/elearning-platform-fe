import { Container, Toolbar } from '@material-ui/core';
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

	${({ isDrawerOpen }) => drawerTransitionMixin(isDrawerOpen, 'margin-left')}

	${({ isDesktopDrawer, isDrawerOpen }) =>
		isDesktopDrawer &&
		isDrawerOpen &&
		`margin-left: ${LayoutMeasurements.drawers.desktop.WIDTH};`}
`;
const MainContentContainer = styled(Container)`
	padding-top: ${({ theme }) => theme.spacing(2)}px;
	padding-bottom: ${({ theme }) => theme.spacing(2)}px;
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
				<MainContentContainer maxWidth="md">
					<>{children}</>
				</MainContentContainer>
			</MainStyled>
		</>
	);
});
