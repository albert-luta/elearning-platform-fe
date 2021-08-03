import { Container, Toolbar } from '@material-ui/core';
import { LayoutMeasurements } from 'domains/shared/constants/LayoutMeasurements';
import { FC, memo } from 'react';
import styled from 'styled-components';
import { createDrawerTransition } from './index.styles';

interface MainContentProps {
	// Menu
	isMenuDrawerDesktop: boolean;
	isMenuDrawerOpen: boolean;
	// Extra content
	isExtraContentDrawerOpen: boolean;
	isExtraContentDrawerDesktop: boolean;
}

const MainStyled = styled.main<MainContentProps>`
	overflow-x: hidden;

	transition: ${({ isMenuDrawerOpen }) =>
			createDrawerTransition(isMenuDrawerOpen, 'margin-left')},
		${({ isExtraContentDrawerOpen }) =>
			createDrawerTransition(isExtraContentDrawerOpen, 'margin-right')};

	${({ isMenuDrawerDesktop, isMenuDrawerOpen }) =>
		isMenuDrawerDesktop &&
		isMenuDrawerOpen &&
		`margin-left: ${LayoutMeasurements.drawers.desktop.WIDTH};`}
	${({ isExtraContentDrawerDesktop, isExtraContentDrawerOpen }) =>
		isExtraContentDrawerDesktop &&
		isExtraContentDrawerOpen &&
		`margin-right: ${LayoutMeasurements.drawers.desktop.WIDTH}`}
`;
const MainContentContainer = styled(Container)`
	padding-top: ${({ theme }) => theme.spacing(2)}px;
	padding-bottom: ${({ theme }) => theme.spacing(2)}px;
`;
export const MainContent: FC<MainContentProps> = memo(function MainContent({
	isMenuDrawerDesktop,
	isMenuDrawerOpen,
	isExtraContentDrawerOpen,
	isExtraContentDrawerDesktop,
	children
}) {
	return (
		<>
			<Toolbar />
			<MainStyled
				isMenuDrawerOpen={isMenuDrawerOpen}
				isMenuDrawerDesktop={isMenuDrawerDesktop}
				isExtraContentDrawerOpen={isExtraContentDrawerOpen}
				isExtraContentDrawerDesktop={isExtraContentDrawerDesktop}
			>
				<MainContentContainer maxWidth="md">
					<>{children}</>
				</MainContentContainer>
			</MainStyled>
		</>
	);
});
