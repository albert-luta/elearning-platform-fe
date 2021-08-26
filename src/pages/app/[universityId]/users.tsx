import { Box, CircularProgress, Typography } from '@material-ui/core';
import { ContentHeader } from 'domains/shared/components/layout/ContentHeader';
import { MyHead } from 'domains/shared/components/MyHead';
import { UsersTable } from 'domains/university-user/components/UsersTable';
import { selectedUniversityVar } from 'domains/university/reactiveVars';
import { useUniversityUsersQuery } from 'generated/graphql';

export default function Users() {
	const universityUsers = useUniversityUsersQuery({
		variables: {
			universityId: selectedUniversityVar()?.id ?? 'placeholder'
		}
	});

	return (
		<>
			<MyHead title="Users" />

			<ContentHeader title="Users" />

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
					<UsersTable users={universityUsers.data.universityUsers} />
				);
			})()}
		</>
	);
}
