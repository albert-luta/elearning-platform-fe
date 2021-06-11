import { Box, Dialog, IconButton, Tooltip } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Content } from 'domains/shared/components/layout/Content';
import { ContentHeader } from 'domains/shared/components/layout/ContentHeader';
import { MyHead } from 'domains/shared/components/MyHead';
import { MySkeleton } from 'domains/shared/components/MySkeleton';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import { CreateUniversityForm } from 'domains/university/components/UniversityForm/CreateUniversityForm';
import { UniversitiesCards } from 'domains/university/components/UniversitiesCards';
import { useMeQuery } from 'generated/graphql';

export default function App() {
	const me = useMeQuery();
	const [
		isCreateUniversityDialogOpen,
		openCreateUniversityDialog,
		closeCreateUniversityDialog
	] = useBooleanState();

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
						<Box key={i} pt={i && 1}>
							<MySkeleton variant="round" height={72} />
						</Box>
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
