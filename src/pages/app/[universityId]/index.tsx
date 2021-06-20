import { useReactiveVar } from '@apollo/client';
import { Box, List, Typography } from '@material-ui/core';
import { CollegeDashboardCollapsible } from 'domains/college/components/CollegeDashboardCollapsible';
import { CreateCollegeForm } from 'domains/college/components/CollegeForm/CreateCollegeForm';
import { AddListItem } from 'domains/shared/components/list/AddListItem';
import { MyHead } from 'domains/shared/components/MyHead';
import { MySkeleton } from 'domains/shared/components/MySkeleton';
import { UserRole } from 'domains/shared/constants/UserRole';
import { selectedUniversityVar } from 'domains/university/reactiveVars';
import { useCollegesQuery } from 'generated/graphql';

export default function UniversityDashboard() {
	const colleges = useCollegesQuery({
		variables: {
			universityId: selectedUniversityVar()?.id ?? 'placeholder'
		}
	});
	const university = useReactiveVar(selectedUniversityVar);

	return (
		<>
			<MyHead title="University" />

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
							<Box pb={1}>
								<Typography
									color="textSecondary"
									align="center"
								>
									There are no colleges created yet
								</Typography>
							</Box>
							{university?.role === UserRole.ADMIN && (
								<AddListItem
									variant="h5"
									resourceType="College"
									form={(onSuccess) => (
										<CreateCollegeForm
											onSuccess={onSuccess}
										/>
									)}
								/>
							)}
						</Box>
					);
				}

				return (
					<List>
						{university?.role === UserRole.ADMIN && (
							<AddListItem
								variant="h5"
								resourceType="College"
								form={(onSuccess) => (
									<CreateCollegeForm onSuccess={onSuccess} />
								)}
							/>
						)}
						{colleges.data.colleges.map((college) => (
							<CollegeDashboardCollapsible
								key={college.id}
								college={college}
							/>
						))}
					</List>
				);
			})()}
		</>
	);
}
