import {
	Button,
	ButtonProps,
	Dialog,
	DialogProps,
	Typography,
	TypographyProps
} from '@material-ui/core';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import { FC, memo, ReactNode } from 'react';
import { Content } from '../layout/Content';
import { ContentHeader } from '../layout/ContentHeader';

interface AddButtonProps {
	text?: string;
	variant?: TypographyProps['variant'];
	fullWidth?: ButtonProps['fullWidth'];
	dialogMaxWidth?: DialogProps['maxWidth'];
	resourceType: string;
	form: (onSuccess: () => void) => ReactNode;
}

export const AddButton: FC<AddButtonProps> = memo(function AddButton({
	text,
	variant,
	fullWidth,
	dialogMaxWidth = 'xs',
	resourceType,
	form
}) {
	const [isDialogOpen, openDialog, closeDialog] = useBooleanState();

	return (
		<>
			<Button
				onClick={openDialog}
				style={{ textTransform: 'none' }}
				fullWidth={fullWidth}
			>
				<Typography variant={variant}>{text ?? '+ Create'}</Typography>
			</Button>

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
