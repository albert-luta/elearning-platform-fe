import styled, { css } from 'styled-components';
import {
	Divider,
	Drawer,
	DrawerProps,
	IconButton,
	createStyles,
	makeStyles,
	Tooltip
} from '@material-ui/core';
import { FC, memo } from 'react';
import { ChevronLeft } from '@material-ui/icons';
import { LayoutMeasurements } from 'domains/shared/constants/LayoutMeasurements';

interface DrawerStyledProps {
	desktop?: boolean;
}
export const DrawerStyled = styled(
	({ desktop, ...props }: DrawerStyledProps & DrawerProps) => (
		<Drawer {...props} variant={desktop ? 'persistent' : props.variant} />
	)
)`
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

const useStyles = makeStyles((theme) =>
	createStyles({
		drawerHeader: {
			display: 'flex',
			justifyContent: 'flex-end',
			alignItems: 'center',
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar
		}
	})
);

interface DrawerHeaderProps {
	onClose?: () => void;
}
export const DrawerHeader: FC<DrawerHeaderProps> = memo(function DrawerHeader({
	onClose
}) {
	const classes = useStyles();

	return (
		<>
			<div className={classes.drawerHeader}>
				{onClose && (
					<Tooltip title="Close Drawer">
						<IconButton onClick={onClose}>
							<ChevronLeft />
						</IconButton>
					</Tooltip>
				)}
			</div>
			<Divider />
		</>
	);
});
