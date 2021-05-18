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
import { SnackbarErrors } from 'domains/shared/constants/SnackbarErrors';
import { UserRole } from 'domains/shared/constants/UserRole';
import { removeUniversityUpdate } from 'domains/shared/graphql/updates/removeUniversityUpdate';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import { sleep } from 'domains/shared/utils/sleep';
import { UpdateUniversityForm } from 'domains/university/components/UpdateUniversityForm';
import {
	UniversityObject,
	useLeaveUniversityMutation
} from 'generated/graphql';
import {
	bindMenu,
	bindTrigger,
	usePopupState
} from 'material-ui-popup-state/hooks';
import { useSnackbar } from 'notistack';
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
		const snackbar = useSnackbar();

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
		] = useLeaveUniversityMutation({ update: removeUniversityUpdate });
		const handleLeaveAnswer = useCallback(
			async (answer: boolean) => {
				if (!answer) {
					closeLeaveDialog();
					moreMenuState.close();
					return;
				}

				try {
					if (answer) {
						const { __typename, ...rest } = university;
						await leaveUniversity({
							variables: {
								university: rest
							}
						});
					}
				} catch {
					snackbar.enqueueSnackbar(
						SnackbarErrors.INTERNAL_SERVER_ERROR,
						{ variant: 'error' }
					);
				}
			},
			[
				closeLeaveDialog,
				leaveUniversity,
				university,
				moreMenuState,
				snackbar
			]
		);

		const [
			isDeleteDialogOpen,
			openDeleteDialog,
			closeDeleteDialog
		] = useBooleanState();
		const handleDeleteAnswer = useCallback(
			async (answer: boolean) => {
				if (!answer) {
					closeDeleteDialog();
					moreMenuState.close();
				}

				try {
					if (answer) {
						await sleep(0);
					}
				} catch (e) {
					console.log(e);
				}
			},
			[closeDeleteDialog, moreMenuState]
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
					// loading={deleteUniversity.loading}
				/>
			</>
		);
	}
);
