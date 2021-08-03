import { FC, memo, useMemo } from 'react';
import styled, { css } from 'styled-components';
import {
	IconButton,
	makeStyles,
	Tooltip,
	Divider,
	Drawer,
	DrawerProps,
	Theme
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { LayoutMeasurements } from 'domains/shared/constants/LayoutMeasurements';

export const createDrawerTransition = (
	isOpen: boolean,
	fields: string | string[]
) => css`
	${({ theme }) =>
		theme.transitions.create(fields, {
			easing: theme.transitions.easing[isOpen ? 'easeOut' : 'sharp'],
			duration:
				theme.transitions.duration[
					isOpen ? 'enteringScreen' : 'leavingScreen'
				]
		})}
`;

interface DrawerStyledProps {
	desktop?: boolean;
}
export const DrawerStyled = styled(
	({ desktop, ...props }: DrawerStyledProps & DrawerProps) => (
		<Drawer
			{...props}
			variant={desktop ? 'persistent' : props.variant}
			ModalProps={{ keepMounted: true }}
		/>
	)
)`
	display: flex;
	flex-direction: column;

	${({ desktop, theme }) =>
		desktop &&
		css`
			position: fixed;
			z-index: ${theme.zIndex.drawer};
		`}

	& .MuiDrawer-paper {
		width: ${({ desktop }) =>
			LayoutMeasurements.drawers[desktop ? 'desktop' : 'mobile'].WIDTH};
		${({ desktop }) =>
			!desktop &&
			`max-width: ${LayoutMeasurements.drawers.mobile.MAX_WIDTH};`}
	}
`;

type DrawerAnchor = 'left' | 'right';
const useStyles = makeStyles<Theme, { anchor: DrawerAnchor }, 'drawerHeader'>(
	(theme) => ({
		drawerHeader: {
			display: 'flex',
			justifyContent: ({ anchor }) =>
				anchor === 'left' ? 'flex-end' : 'flex-start',
			alignItems: 'center',
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar
		}
	})
);

interface DrawerHeaderProps {
	onClose?: () => void;
	anchor?: DrawerAnchor;
}
export const DrawerHeader: FC<DrawerHeaderProps> = memo(function DrawerHeader({
	onClose,
	anchor = 'left'
}) {
	const stylesProps = useMemo(() => ({ anchor }), [anchor]);
	const classes = useStyles(stylesProps);

	return (
		<div>
			<div className={classes.drawerHeader}>
				{onClose && (
					<Tooltip title="Close Drawer">
						<IconButton onClick={onClose}>
							{anchor === 'left' ? (
								<ChevronLeft />
							) : (
								<ChevronRight />
							)}
						</IconButton>
					</Tooltip>
				)}
			</div>
			<Divider />
		</div>
	);
});
