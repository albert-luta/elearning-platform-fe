import {
	Dialog,
	DialogProps,
	ListItem,
	Typography,
	TypographyProps
} from '@material-ui/core';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import { FC, memo, ReactNode } from 'react';
import { ContentHeader } from '../layout/ContentHeader';
import { Content } from '../layout/Content';

interface AddListItemProps {
	text?: string;
	variant?: TypographyProps['variant'];
	dialogMaxWidth?: DialogProps['maxWidth'];
	resourceType: string;
	form: (onSuccess: () => void) => ReactNode;
}

export const AddListItem: FC<AddListItemProps> = memo(function AddListItem({
	text,
	variant,
	dialogMaxWidth = 'xs',
	resourceType,
	form
}) {
	const [isDialogOpen, openDialog, closeDialog] = useBooleanState();

	return (
		<>
			<ListItem button onClick={openDialog}>
				<Typography
					variant={variant}
					align="center"
					style={{ width: '100%' }}
				>
					{text ?? '+ Create'}
				</Typography>
			</ListItem>

			<Dialog
				open={isDialogOpen}
				onClose={closeDialog}
				fullWidth
				maxWidth={dialogMaxWidth}
			>
				<Content>
					<ContentHeader title={`Create ${resourceType}`} />
					{form(closeDialog)}
				</Content>
			</Dialog>
		</>
	);
});
