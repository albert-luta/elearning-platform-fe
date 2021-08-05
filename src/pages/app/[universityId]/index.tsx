import { useReactiveVar } from '@apollo/client';
import {
	Box,
	IconButton,
	List,
	Tooltip,
	Typography,
	Dialog
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { CollegeDashboardCollapsible } from 'domains/college/components/CollegeDashboardCollapsible';
import { CreateCollegeForm } from 'domains/college/components/CollegeForm/CreateCollegeForm';
import { Content } from 'domains/shared/components/layout/Content';
import { ContentHeader } from 'domains/shared/components/layout/ContentHeader';
import { MyHead } from 'domains/shared/components/MyHead';
import { MySkeleton } from 'domains/shared/components/MySkeleton';
import { UserRole } from 'domains/shared/constants/UserRole';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import { selectedUniversityVar } from 'domains/university/reactiveVars';
import { useCollegesQuery } from 'generated/graphql';

export default function UniversityDashboard() {
	const colleges = useCollegesQuery({
		variables: {
			universityId: selectedUniversityVar()?.id ?? 'placeholder'
		}
	});
	const university = useReactiveVar(selectedUniversityVar);

	const [
		isCreateCollegeDialogOpen,
		openCreateCollegeDialog,
		closeCreateCollegeDialog
	] = useBooleanState();

	return (
		<>
			<MyHead title="University" />
			<ContentHeader
				title="Colleges"
				action={
					university?.role === UserRole.ADMIN && (
						<Tooltip title="Create College">
							<IconButton onClick={openCreateCollegeDialog}>
								<Add />
							</IconButton>
						</Tooltip>
					)
				}
			/>

			{(() => {
				if (colleges.loading) {
					return (
						<Box py={1} px={2}>
							{Array(5)
								.fill(0)
								.map((_, i) => (
									<Box key={i} pt={i && 1}>
										<MySkeleton
											variant="round"
											height={50}
										/>
									</Box>
								))}
						</Box>
					);
				}

				if (!colleges.data?.colleges.length) {
					return (
						<Box py={1} px={2}>
							<Typography color="textSecondary" align="center">
								There are no colleges created yet
							</Typography>
						</Box>
					);
				}

				return (
					<List>
						{colleges.data.colleges.map((college) => (
							<CollegeDashboardCollapsible
								key={college.id}
								college={college}
							/>
						))}
					</List>
				);
			})()}

			<Dialog
				open={isCreateCollegeDialogOpen}
				onClose={closeCreateCollegeDialog}
				fullWidth
				maxWidth="xs"
			>
				<Content>
					<ContentHeader title="Create College" />
					<CreateCollegeForm onSuccess={closeCreateCollegeDialog} />
				</Content>
			</Dialog>
		</>
	);
}
