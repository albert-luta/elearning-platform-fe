import {
	ListItem,
	Box,
	ListItemText,
	Collapse,
	ListItemSecondaryAction,
	TypographyProps
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import { FC, memo, ReactNode } from 'react';

interface ListItemCollapsibleProps {
	name: string;
	action?: ReactNode;
	variant?: TypographyProps['variant'];
}

export const ListItemCollapsible: FC<ListItemCollapsibleProps> = memo(
	function ListItemCollapsible({ name, action, variant = 'h5', children }) {
		const [isOpen, , , toggleIsOpen] = useBooleanState();

		return (
			<>
				<ListItem button onClick={toggleIsOpen}>
					<Box display="flex" alignItems="center" pr={2}>
						{isOpen ? <ExpandLess /> : <ExpandMore />}
					</Box>
					<ListItemText
						primary={name}
						primaryTypographyProps={{ variant }}
					/>
					{action && (
						<ListItemSecondaryAction>
							{action}
						</ListItemSecondaryAction>
					)}
				</ListItem>

				<Collapse in={isOpen}>
					<Box p={2}>{children}</Box>
				</Collapse>
			</>
		);
	}
);
