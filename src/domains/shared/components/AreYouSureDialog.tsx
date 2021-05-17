import { Box, Button, Dialog, Typography } from '@material-ui/core';
import { FC, memo, useCallback } from 'react';
import { ButtonWithLoader } from './buttons/ButtonWithLoader';
import { Content } from './layout/Content';

interface AreYouSureDialogProps {
	title: string;
	subtitle?: string;
	open: boolean;
	loading?: boolean;
	onAnswer: (answer: boolean) => void | Promise<void>;
}

export const AreYouSureDialog: FC<AreYouSureDialogProps> = memo(
	function AreYouSureDialog({
		title,
		subtitle,
		open,
		loading = false,
		onAnswer
	}) {
		const answerPositive = useCallback(() => onAnswer(true), [onAnswer]);
		const answerNegative = useCallback(() => onAnswer(false), [onAnswer]);

		return (
			<Dialog
				open={open}
				onClose={answerNegative}
				fullWidth
				maxWidth="xs"
				disableBackdropClick={loading}
				disableEscapeKeyDown={loading}
			>
				<Content>
					<Typography variant="h5" align="center">
						Are you sure that you want to {title}?
					</Typography>
					{subtitle && (
						<Box mt={1}>
							<Typography color="textSecondary" align="center">
								{subtitle}
							</Typography>
						</Box>
					)}

					<Box
						mt={4}
						display="grid"
						gridTemplateColumns="1fr 1fr"
						gridColumnGap="5%"
					>
						<ButtonWithLoader
							variant="contained"
							color="secondary"
							loading={loading}
							onClick={answerPositive}
							fullWidth
						>
							Yes
						</ButtonWithLoader>
						<Button
							variant="contained"
							color="primary"
							onClick={answerNegative}
							disabled={loading}
							fullWidth
						>
							No
						</Button>
					</Box>
				</Content>
			</Dialog>
		);
	}
);
