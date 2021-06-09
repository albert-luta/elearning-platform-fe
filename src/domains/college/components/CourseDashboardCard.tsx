import { useReactiveVar } from '@apollo/client';
import { Box, Card, CardContent, Typography } from '@material-ui/core';
import { CardActionAreaLink } from 'domains/shared/components/card/CardActionAreaLink';
import { Routes } from 'domains/shared/constants/Routes';
import { composeDynamicRoute } from 'domains/shared/utils/route/composeDynamicRoute';
import { selectedUniversityVar } from 'domains/university/reactiveVars';
import { CourseObject } from 'generated/graphql';
import { FC, memo } from 'react';

interface CourseDashboardCardProps {
	collegeId: string;
	course: CourseObject;
}

export const CourseDashboardCard: FC<CourseDashboardCardProps> = memo(
	function CourseDashboardCard({ collegeId, course: { id, name } }) {
		const university = useReactiveVar(selectedUniversityVar);

		return (
			<Card>
				<Box height="100%" display="flex" alignItems="stretch">
					<CardActionAreaLink
						href={composeDynamicRoute(
							Routes.course.DASHBOARD.path,
							{
								universityId: university?.id ?? 'placeholder',
								collegeId,
								courseId: id
							}
						)}
					>
						<CardContent>
							<Typography>{name}</Typography>
						</CardContent>
					</CardActionAreaLink>
				</Box>
			</Card>
		);
	}
);
