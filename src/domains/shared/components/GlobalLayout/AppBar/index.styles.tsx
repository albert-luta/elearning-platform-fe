import styled from 'styled-components';
import { AppBar, AppBarProps } from '@material-ui/core';
import { createDrawerTransition } from '../index.styles';
import { LayoutMeasurements } from 'domains/shared/constants/LayoutMeasurements';

interface AppBarStyledProps {
	// Menu
	isMenuDrawerDesktop: boolean;
	isMenuDrawerOpen: boolean;
	// Extra content
	isExtraContentDrawerOpen: boolean;
	isExtraContentDrawerDesktop: boolean;
}
export const AppBarStyled = styled(
	({
		isMenuDrawerDesktop,
		isMenuDrawerOpen,
		isExtraContentDrawerOpen,
		isExtraContentDrawerDesktop,
		...props
	}: AppBarStyledProps & AppBarProps) => <AppBar {...props} />
)`
	width: auto;
	left: 0;
	right: 0;
	transition: ${({ isMenuDrawerOpen }) =>
			createDrawerTransition(isMenuDrawerOpen, 'left')},
		${({ isExtraContentDrawerOpen }) =>
			createDrawerTransition(isExtraContentDrawerOpen, 'right')};
	${({ isMenuDrawerDesktop, isMenuDrawerOpen }) =>
		isMenuDrawerDesktop &&
		isMenuDrawerOpen &&
		`left: ${LayoutMeasurements.drawers.desktop.WIDTH};`}
	${({ isExtraContentDrawerDesktop, isExtraContentDrawerOpen }) =>
		isExtraContentDrawerDesktop &&
		isExtraContentDrawerOpen &&
		`right: ${LayoutMeasurements.drawers.desktop.WIDTH};`}
`;

export const EmptyMiddleSpace = styled.div`
	flex: 1 1 auto;
`;
