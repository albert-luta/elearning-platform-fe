import { Box, Dialog, IconButton, Tooltip } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Content } from 'domains/shared/components/layout/Content';
import { ContentHeader } from 'domains/shared/components/layout/ContentHeader';
import { MyHead } from 'domains/shared/components/MyHead';
import { MySkeleton } from 'domains/shared/components/MySkeleton';
import { useOpenState } from 'domains/shared/hooks/useOpenState';
import { CreateUniversityForm } from 'domains/university/components/CreateUniversityForm';
import { UniversitiesCards } from 'domains/user/components/UniversitiesCards';
import { useMeQuery } from 'generated/graphql';
import { Fragment } from 'react';

export default function App() {
	const me = useMeQuery();
	const [
		isCreateUniversityDialogOpen,
		openCreateUniversityDialog,
		closeCreateUniversityDialog
	] = useOpenState();

	return (
		<>
			<MyHead title="Dashboard" />

			<ContentHeader
				title="Universities"
				action={
					<Tooltip title="Create University">
						<IconButton onClick={openCreateUniversityDialog}>
							<Add />
						</IconButton>
					</Tooltip>
				}
			/>

			{me.loading ? (
				Array(3)
					.fill(0)
					.map((_, i) => (
						<Fragment key={i}>
							<MySkeleton variant="round" height={72} />
							<Box pt={1} />
						</Fragment>
					))
			) : (
				<UniversitiesCards
					groupedByRoleUniversities={
						me.data?.me.groupedByRoleUniversities
					}
				/>
			)}

			<Dialog
				open={isCreateUniversityDialogOpen}
				onClose={closeCreateUniversityDialog}
				fullWidth
				maxWidth="xs"
			>
				<Content>
					<ContentHeader title="Create University" />
					<CreateUniversityForm
						onSuccess={closeCreateUniversityDialog}
					/>
				</Content>
			</Dialog>
		</>
	);
}
