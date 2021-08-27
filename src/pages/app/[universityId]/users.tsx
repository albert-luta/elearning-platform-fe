import {
	Box,
	CircularProgress,
	Typography,
	Tooltip,
	IconButton,
	Dialog
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Content } from 'domains/shared/components/layout/Content';
import { ContentHeader } from 'domains/shared/components/layout/ContentHeader';
import { MyHead } from 'domains/shared/components/MyHead';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import { CreateUniversityUserForm } from 'domains/university-user/components/UniversityUserForm/CreateUniversityUserForm';
import { UniversityUsersTable } from 'domains/university-user/components/UniversityUsersTable';
import { selectedUniversityVar } from 'domains/university/reactiveVars';
import { useUniversityUsersQuery } from 'generated/graphql';

export default function Users() {
	const universityUsers = useUniversityUsersQuery({
		variables: {
			universityId: selectedUniversityVar()?.id ?? 'placeholder'
		}
	});

	const [
		isAddUserDialogOpen,
		openAddUserDialog,
		closeAddUserDialog
	] = useBooleanState();

	return (
		<>
			<MyHead title="Users" />

			<ContentHeader
				title="Users"
				action={
					<Tooltip title="Add User">
						<IconButton onClick={openAddUserDialog}>
							<Add />
						</IconButton>
					</Tooltip>
				}
			/>

			{(() => {
				if (universityUsers.loading) {
					return (
						<Box display="flex" justifyContent="center">
							<CircularProgress />
						</Box>
					);
				}

				if (!universityUsers.data) {
					return (
						<Typography color="textSecondary" align="center">
							There was a problem getting the users
						</Typography>
					);
				}

				if (!universityUsers.data.universityUsers.length) {
					return (
						<Typography color="textSecondary" align="center">
							There are no users yet enrolled
						</Typography>
					);
				}

				return (
					<UniversityUsersTable
						universityUsers={universityUsers.data.universityUsers}
					/>
				);
			})()}

			<Dialog
				open={isAddUserDialogOpen}
				onClose={closeAddUserDialog}
				fullWidth
				maxWidth="sm"
			>
				<Content>
					<ContentHeader title="Add User" />
					<CreateUniversityUserForm onSuccess={closeAddUserDialog} />
				</Content>
			</Dialog>
		</>
	);
}
