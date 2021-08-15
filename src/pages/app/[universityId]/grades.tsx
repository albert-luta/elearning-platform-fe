import { Box, CircularProgress, List, Typography } from '@material-ui/core';
import { CollegeGradeCollapsible } from 'domains/college/components/CollegeGradeCollapsible';
import { ContentHeader } from 'domains/shared/components/layout/ContentHeader';
import { MyHead } from 'domains/shared/components/MyHead';
import { selectedUniversityVar } from 'domains/university/reactiveVars';
import { useGradesQuery } from 'generated/graphql';

export default function Grades() {
	const grades = useGradesQuery({
		variables: {
			universityId: selectedUniversityVar()?.id ?? 'placeholder'
		}
	});

	return (
		<>
			<MyHead title="Grades" />

			<ContentHeader title="Grades" />

			{(() => {
				if (grades.loading) {
					return (
						<Box display="flex" justifyContent="center">
							<CircularProgress />
						</Box>
					);
				}

				if (!grades.data) {
					return (
						<Typography color="textSecondary" align="center">
							There was a problem getting your grades
						</Typography>
					);
				}

				if (!grades.data.colleges.length) {
					return (
						<Typography color="textSecondary" align="center">
							There are no grades to be seen
						</Typography>
					);
				}

				return (
					<List>
						{grades.data.colleges.map((college) => (
							<CollegeGradeCollapsible
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
