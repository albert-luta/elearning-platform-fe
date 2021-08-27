import {
	DataGrid,
	GridCellParams,
	GridCellValue,
	GridColDef
} from '@material-ui/data-grid';
import { ModifyResourceAction } from 'domains/shared/components/ModifyResourceAction';
import { MyAvatar } from 'domains/shared/components/MyAvatar';
import { UserRole } from 'domains/shared/constants/UserRole';
import { formatUserRole } from 'domains/shared/utils/formatUserRole';
import {
	UniversityUsersQuery,
	useDeleteUniversityUserMutation
} from 'generated/graphql';
import { FC, memo, useCallback } from 'react';
import { deleteUniversityUserUpdate } from '../graphql/updates/deleteUniversityUserUpdate';
import { UpdateUniversityUserForm } from './UniversityUserForm/UpdateUniversityUserForm';

type UniversityUser = UniversityUsersQuery['universityUsers'][number];

const sortComparator = (v1: GridCellValue, v2: GridCellValue) =>
	(v1 as string).toString().localeCompare((v2 as string).toString());

const UserAvatar = ({ value, row }: GridCellParams) => {
	return (
		<MyAvatar
			src={value as string}
			alt={`${(row as UniversityUser).user.firstName} ${
				(row as UniversityUser).user.lastName
			} avatar`}
		/>
	);
};

const UserActions = ({ row }: GridCellParams) => {
	const [
		deleteUniversityUser,
		{ loading: deleteUniversityUserLoading }
	] = useDeleteUniversityUserMutation({ update: deleteUniversityUserUpdate });
	const handleDeleteUniversityUser = useCallback((): void => {
		deleteUniversityUser({
			variables: {
				id: (row as UniversityUser).id
			}
		}).catch(() => null);
	}, [deleteUniversityUser, row]);

	if ((row as UniversityUser).role.name === UserRole.ADMIN) {
		return null;
	}

	return (
		<ModifyResourceAction
			// Shared
			resourceName={
				(row as UniversityUser).user.firstName +
				' ' +
				(row as UniversityUser).user.lastName
			}
			resourceType="User"
			// Update
			updateForm={(onSuccess) => (
				<UpdateUniversityUserForm
					universityUserId={(row as UniversityUser).id}
					onSuccess={onSuccess}
				/>
			)}
			// Delete
			deleteSubtitle="Data about the user will be lost, you will not be able to recover it"
			onDelete={handleDeleteUniversityUser}
			deleteLoading={deleteUniversityUserLoading}
		/>
	);
};

const columns: GridColDef[] = [
	{
		field: 'avatar',
		headerName: 'Avatar',
		align: 'center',
		headerAlign: 'center',
		disableColumnMenu: true,
		sortable: false,
		valueGetter: ({ row }) => (row as UniversityUser).user.avatar,
		renderCell: UserAvatar
	},
	{
		field: 'firstName',
		headerName: 'First Name',
		width: 150,
		valueGetter: ({ row }) => (row as UniversityUser).user.firstName,
		sortComparator
	},
	{
		field: 'fatherInitial',
		headerName: 'Father Initial',
		width: 125,
		valueGetter: ({ row }) => (row as UniversityUser).user.fatherInitial,
		valueFormatter: ({ value }) => (value as string) + '.',
		sortComparator
	},
	{
		field: 'lastName',
		headerName: 'Last Name',
		width: 150,
		valueGetter: ({ row }) => (row as UniversityUser).user.lastName,
		sortComparator
	},
	{
		field: 'role',
		headerName: 'Role',
		width: 125,
		valueGetter: ({ value }) => (value as UniversityUser['role']).name,
		valueFormatter: ({ value }) => formatUserRole(value as UserRole),
		sortComparator
	},
	{
		field: 'email',
		headerName: 'Email',
		flex: 1,
		valueGetter: ({ row }) => (row as UniversityUser).user.email,
		sortComparator
	},
	{
		field: 'actions',
		headerName: 'Actions',
		align: 'center',
		headerAlign: 'center',
		disableColumnMenu: true,
		sortable: false,
		renderCell: UserActions
	}
];

interface UniversityUsersTableProps {
	universityUsers: UniversityUsersQuery['universityUsers'];
}

export const UniversityUsersTable: FC<UniversityUsersTableProps> = memo(
	function UniversityUsersTable({ universityUsers }) {
		return (
			<DataGrid
				rows={universityUsers}
				columns={columns}
				autoHeight
				autoPageSize
				disableSelectionOnClick
			/>
		);
	}
);
