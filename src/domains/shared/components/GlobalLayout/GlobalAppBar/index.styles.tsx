import styled from 'styled-components';
import { AppBar, AppBarProps } from '@material-ui/core';
import { drawerTransitionMixin } from '../index.styles';
import { LayoutMeasurements } from 'domains/shared/constants/LayoutMeasurements';

interface AppBarStyledProps {
	isDesktopDrawer: boolean;
	isDrawerOpen: boolean;
}
export const AppBarStyled = styled(
	({
		isDesktopDrawer,
		isDrawerOpen,
		...props
	}: AppBarStyledProps & AppBarProps) => <AppBar {...props} />
)`
	${({ isDrawerOpen }) => drawerTransitionMixin(isDrawerOpen, 'width')}
	${({ isDesktopDrawer, isDrawerOpen }) =>
		isDesktopDrawer &&
		isDrawerOpen &&
		`width: calc(100% - ${LayoutMeasurements.drawers.desktop.WIDTH});`}
`;

export const EmptyMiddleSpace = styled.div`
	flex: 1 1 auto;
`;
