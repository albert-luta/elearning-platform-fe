import {
	Tooltip,
	Dialog,
	DialogProps,
	IconButton,
	ListItemText,
	Menu,
	MenuItem
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import {
	bindMenu,
	bindTrigger,
	usePopupState
} from 'material-ui-popup-state/hooks';
import { FC, memo, ReactNode, useCallback } from 'react';
import { useBooleanState } from '../hooks/useBooleanState';
import { ContentHeader } from './layout/ContentHeader';
import { Content } from './layout/Content';
import { AreYouSureDialog } from './AreYouSureDialog';

interface ModifyResourceActionProps {
	// Shared
	resourceType: string;
	resourceName: string;
	// Update
	updateDialogMaxWidth?: DialogProps['maxWidth'];
	updateForm: (onSuccess: () => void) => ReactNode;
	// Delete
	deleteSubtitle?: string;
	onDelete: () => void;
	deleteLoading: boolean;
}

export const ModifyResourceAction: FC<ModifyResourceActionProps> = memo(
	function ModifyResourceAction({
		resourceType,
		resourceName,
		deleteSubtitle = 'It will be permanently deleted, you will not be able to recover it',
		onDelete,
		deleteLoading,
		updateDialogMaxWidth = 'xs',
		updateForm
	}) {
		const modifyResouceMenuState = usePopupState({
			variant: 'popover',
			popupId: 'modify-resource-action'
		});

		const [
			isUpdateDialogOpen,
			openUpdateDialog,
			closeUpdateDialog
		] = useBooleanState();
		const handleUpdateUniversity = useCallback((): void => {
			closeUpdateDialog();
			modifyResouceMenuState.close();
		}, [closeUpdateDialog, modifyResouceMenuState]);

		const [
			isDeleteDialogOpen,
			openDeleteDialog,
			closeDeleteDialog
		] = useBooleanState();
		const handleDeleteAnswer = useCallback(
			(answer: boolean): void => {
				if (!answer) {
					closeDeleteDialog();
					modifyResouceMenuState.close();
					return;
				}

				onDelete();
			},
			[closeDeleteDialog, modifyResouceMenuState, onDelete]
		);

		return (
			<>
				<Tooltip title="More">
					<IconButton {...bindTrigger(modifyResouceMenuState)}>
						<MoreVert />
					</IconButton>
				</Tooltip>

				<Menu {...bindMenu(modifyResouceMenuState)}>
					<MenuItem onClick={openUpdateDialog}>
						<ListItemText primary="Edit" />
					</MenuItem>
					<MenuItem onClick={openDeleteDialog}>
						<ListItemText primary="Delete" />
					</MenuItem>
				</Menu>

				<Dialog
					open={isUpdateDialogOpen}
					onClose={handleUpdateUniversity}
					fullWidth
					maxWidth={updateDialogMaxWidth}
				>
					<Content>
						<ContentHeader title={`Update ${resourceType}`} />
						{updateForm(handleUpdateUniversity)}
					</Content>
				</Dialog>
				<AreYouSureDialog
					title={`delete ${resourceName} ${resourceType.toLowerCase()}`}
					subtitle={deleteSubtitle}
					open={isDeleteDialogOpen}
					onAnswer={handleDeleteAnswer}
					loading={deleteLoading}
				/>
			</>
		);
	}
);
