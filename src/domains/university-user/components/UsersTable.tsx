import {
	DataGrid,
	GridCellParams,
	GridCellValue,
	GridColDef
} from '@material-ui/data-grid';
import { MyAvatar } from 'domains/shared/components/MyAvatar';
import { UserRole } from 'domains/shared/constants/UserRole';
import { formatUserRole } from 'domains/shared/utils/formatUserRole';
import { UniversityUsersQuery } from 'generated/graphql';
import { FC, memo } from 'react';

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

const columns: GridColDef[] = [
	{
		field: 'avatar',
		headerName: 'Avatar',
		width: 150,
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
	}
];

interface UsersTableProps {
	users: UniversityUsersQuery['universityUsers'];
}

export const UsersTable: FC<UsersTableProps> = memo(function UsersTable({
	users
}) {
	return (
		<DataGrid
			rows={users}
			columns={columns}
			autoHeight
			autoPageSize
			disableSelectionOnClick
		/>
	);
});
