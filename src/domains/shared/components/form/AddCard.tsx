import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	Dialog,
	DialogProps,
	Typography,
	TypographyProps
} from '@material-ui/core';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import { FC, memo, ReactNode } from 'react';
import { Content } from '../layout/Content';
import { ContentHeader } from '../layout/ContentHeader';

interface AddCardProps {
	text?: string;
	variant?: TypographyProps['variant'];
	dialogMaxWidth?: DialogProps['maxWidth'];
	resourceType: string;
	form: (onSuccess: () => void) => ReactNode;
}

export const AddCard: FC<AddCardProps> = memo(function AddCard({
	text,
	variant,
	dialogMaxWidth = 'xs',
	resourceType,
	form
}) {
	const [isDialogOpen, openDialog, closeDialog] = useBooleanState();

	return (
		<>
			<Card>
				<Box height="100%" display="flex" alignItems="stretch">
					<CardActionArea onClick={openDialog}>
						<CardContent>
							<Typography variant={variant} align="center">
								{text ?? '+ Create'}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Box>
			</Card>

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
