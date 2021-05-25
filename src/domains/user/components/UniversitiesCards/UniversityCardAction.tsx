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
import { deleteUniversityUpdate } from 'domains/shared/graphql/updates/deleteUniversityUpdate';
import { leaveUniversityUpdate } from 'domains/shared/graphql/updates/leaveUniversityUpdate';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import { UpdateUniversityForm } from 'domains/university/components/UpdateUniversityForm';
import {
	UniversityObject,
	useDeleteUniversityMutation,
	useLeaveUniversityMutation
} from 'generated/graphql';
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
		const handleUpdateUniversity = useCallback(() => {
			closeUpdateUniversityDialog();
			moreMenuState.close();
		}, [closeUpdateUniversityDialog, moreMenuState]);

		const [
			isLeaveDialogOpen,
			openLeaveDialog,
			closeLeaveDialog
		] = useBooleanState();
		const [
			leaveUniversity,
			{ loading: leaveUniversityLoading }
		] = useLeaveUniversityMutation({ update: leaveUniversityUpdate });
		const handleLeaveAnswer = useCallback(
			async (answer: boolean) => {
				if (!answer) {
					closeLeaveDialog();
					moreMenuState.close();
					return;
				}

				const { __typename, ...rest } = university;
				await leaveUniversity({
					variables: {
						university: rest
					}
				}).catch(() => null);
			},
			[closeLeaveDialog, leaveUniversity, university, moreMenuState]
		);

		const [
			isDeleteDialogOpen,
			openDeleteDialog,
			closeDeleteDialog
		] = useBooleanState();
		const [
			deleteUniversity,
			{ loading: deleteUniversityLoading }
		] = useDeleteUniversityMutation({ update: deleteUniversityUpdate });
		const handleDeleteAnswer = useCallback(
			async (answer: boolean) => {
				if (!answer) {
					closeDeleteDialog();
					moreMenuState.close();
					return;
				}

				const { __typename, ...rest } = university;
				await deleteUniversity({
					variables: {
						university: rest
					}
				}).catch(() => null);
			},
			[closeDeleteDialog, moreMenuState, university, deleteUniversity]
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
						<MenuItem onClick={openUpdateUniversityDialog}>
							<ListItemText primary="Edit" />
						</MenuItem>
					)}
					<MenuItem onClick={openLeaveDialog}>
						<ListItemText primary="Leave" />
					</MenuItem>
					{role === UserRole.ADMIN_UNIVERSITY && (
						<MenuItem onClick={openDeleteDialog}>
							<ListItemText primary="Delete" />
						</MenuItem>
					)}
				</Menu>

				<Dialog
					open={isUpdateUniversityDialogOpen}
					onClose={handleUpdateUniversity}
					fullWidth
					maxWidth="xs"
				>
					<Content>
						<ContentHeader title="Update University" />
						<UpdateUniversityForm
							id={university.id}
							onSuccess={handleUpdateUniversity}
						/>
					</Content>
				</Dialog>
				<AreYouSureDialog
					title={`leave ${university.name}`}
					subtitle="You can join later just with an invite"
					open={isLeaveDialogOpen}
					onAnswer={handleLeaveAnswer}
					loading={leaveUniversityLoading}
				/>
				<AreYouSureDialog
					title={`delete ${university.name}`}
					subtitle="It will be permanently deleted, you will not be able to recover it"
					open={isDeleteDialogOpen}
					onAnswer={handleDeleteAnswer}
					loading={deleteUniversityLoading}
				/>
			</>
		);
	}
);
