import { Box, List, Typography } from '@material-ui/core';
import { CollegeDashboardCollapsible } from 'domains/college/components/CollegeDashboardCollapsible';
import { MyHead } from 'domains/shared/components/MyHead';
import { MySkeleton } from 'domains/shared/components/MySkeleton';
import { useCollegesQuery } from 'generated/graphql';

export default function UniversityDashboard() {
	const colleges = useCollegesQuery();

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
		</>
	);
}
