import {
	Dialog,
	IconButton,
	ListItemText,
	Menu,
	MenuItem,
	Tooltip
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { AreYouSureDialog } from 'domains/shared/components/AreYouSureDialog';
import { Content } from 'domains/shared/components/layout/Content';
import { ContentHeader } from 'domains/shared/components/layout/ContentHeader';
import { UserRole } from 'domains/shared/constants/UserRole';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import { sleep } from 'domains/shared/utils/sleep';
import { UpdateUniversityForm } from 'domains/university/components/UpdateUniversityForm';
import { UniversityObject } from 'generated/graphql';
import {
	bindMenu,
	bindTrigger,
	usePopupState
} from 'material-ui-popup-state/hooks';
import { FC, memo, useCallback } from 'react';

interface UniversityCardActionProps {
	role: UserRole;
	university: UniversityObject;
}

export const UniversityCardAction: FC<UniversityCardActionProps> = memo(
	function UniversityCardAction({ role, university }) {
		const moreMenuState = usePopupState({
			variant: 'popover',
			popupId: 'university-card-action'
		});

		const [
			isUpdateUniversityDialogOpen,
			openUpdateUniversityDialog,
			closeUpdateUniversityDialog
		] = useBooleanState();
		const handleUpdateUniversityClick = useCallback(() => {
			openUpdateUniversityDialog();
			moreMenuState.close();
		}, [openUpdateUniversityDialog, moreMenuState]);

		const [
			isLeaveDialogOpen,
			openLeaveDialog,
			closeLeaveDialog
		] = useBooleanState();
		const handleLeaveClick = useCallback(() => {
			openLeaveDialog();
			moreMenuState.close();
		}, [openLeaveDialog, moreMenuState]);
		const handleLeaveAnswer = useCallback(
			async (answer: boolean) => {
				if (!answer) {
					closeLeaveDialog();
					return;
				}

				try {
					await sleep(0);
				} catch (e) {
				} finally {
					closeLeaveDialog();
				}
			},
			[closeLeaveDialog]
		);

		const [
			isDeleteDialogOpen,
			openDeleteDialog,
			closeDeleteDialog
		] = useBooleanState();
		const handleDeleteClick = useCallback(() => {
			openDeleteDialog();
			moreMenuState.close();
		}, [openDeleteDialog, moreMenuState]);
		const handleDeleteAnswer = useCallback(
			async (answer: boolean) => {
				if (!answer) {
					closeDeleteDialog();
					return;
				}

				try {
					await sleep(0);
				} catch (e) {
				} finally {
					closeDeleteDialog();
				}
			},
			[closeDeleteDialog]
		);

		return (
			<>
				<Tooltip title="More">
					<IconButton {...bindTrigger(moreMenuState)}>
						<MoreVert />
					</IconButton>
				</Tooltip>

				<Menu {...bindMenu(moreMenuState)}>
					{role === UserRole.ADMIN_UNIVERSITY && (
						<MenuItem onClick={handleUpdateUniversityClick}>
							<ListItemText primary="Edit" />
						</MenuItem>
					)}
					<MenuItem onClick={handleLeaveClick}>
						<ListItemText primary="Leave" />
					</MenuItem>
					{role === UserRole.ADMIN_UNIVERSITY && (
						<MenuItem onClick={handleDeleteClick}>
							<ListItemText primary="Delete" />
						</MenuItem>
					)}
				</Menu>

				<Dialog
					open={isUpdateUniversityDialogOpen}
					onClose={closeUpdateUniversityDialog}
					fullWidth
					maxWidth="xs"
				>
					<Content>
						<ContentHeader title="Update University" />
						<UpdateUniversityForm
							onSuccess={closeUpdateUniversityDialog}
						/>
					</Content>
				</Dialog>
				<AreYouSureDialog
					title={`leave ${university.name}`}
					subtitle="You can join later just with an invite"
					open={isLeaveDialogOpen}
					onAnswer={handleLeaveAnswer}
					// loading={leaveUniversity.loading}
				/>
				<AreYouSureDialog
					title={`delete ${university.name}`}
					subtitle="It will be permanently deleted, you will not be able to recover it"
					open={isDeleteDialogOpen}
					onAnswer={handleDeleteAnswer}
					// loading={deleteUniversity.loading}
				/>
			</>
		);
	}
);
