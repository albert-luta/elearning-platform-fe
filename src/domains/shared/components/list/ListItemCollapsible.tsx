import {
	ListItem,
	Box,
	ListItemText,
	Collapse,
	ListItemSecondaryAction
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { FC, memo, ReactNode } from 'react';

interface ListItemCollapsibleProps {
	name: string;
	isOpen: boolean;
	onToggle: () => void;
	action?: ReactNode;
}

export const ListItemCollapsible: FC<ListItemCollapsibleProps> = memo(
	function ListItemCollapsible({ name, isOpen, onToggle, action, children }) {
		return (
			<>
				<ListItem button onClick={onToggle}>
					<Box display="flex" alignItems="center" pr={2}>
						{isOpen ? <ExpandLess /> : <ExpandMore />}
					</Box>
					<ListItemText
						primary={name}
						primaryTypographyProps={{ variant: 'h5' }}
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
