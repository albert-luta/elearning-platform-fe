import { useReactiveVar } from '@apollo/client';
import { Box, Card, CardContent, Typography } from '@material-ui/core';
import { UpdateCourseForm } from 'domains/course/components/CourseForm/UpdateCourseForm';
import { deleteCourseUpdate } from 'domains/course/graphql/updates/deleteCourseUpdate';
import { CardActionAreaLink } from 'domains/shared/components/card/CardActionAreaLink';
import { ModifyResourceAction } from 'domains/shared/components/ModifyResourceAction';
import { Routes } from 'domains/shared/constants/Routes';
import { UserRole } from 'domains/shared/constants/UserRole';
import { composeDynamicRoute } from 'domains/shared/utils/route/composeDynamicRoute';
import { selectedUniversityVar } from 'domains/university/reactiveVars';
import {
	CourseBaseFieldsFragment,
	useDeleteCourseMutation
} from 'generated/graphql';
import { FC, memo, useCallback } from 'react';

interface CourseDashboardCardProps {
	collegeId: string;
	course: CourseBaseFieldsFragment;
}

export const CourseDashboardCard: FC<CourseDashboardCardProps> = memo(
	function CourseDashboardCard({ collegeId, course }) {
		const university = useReactiveVar(selectedUniversityVar);

		const [
			deleteCourse,
			{ loading: deleteCourseLoading }
		] = useDeleteCourseMutation({ update: deleteCourseUpdate });
		const handleDeleteCourse = useCallback((): void => {
			deleteCourse({
				variables: {
					id: course.id
				}
			}).catch(() => null);
		}, [deleteCourse, course.id]);

		return (
			<Card>
				<Box
					height="100%"
					display="flex"
					alignItems="stretch"
					justifyContent="space-between"
				>
					<CardActionAreaLink
						href={composeDynamicRoute(
							Routes.course.DASHBOARD.path,
							{
								universityId: university?.id ?? 'placeholder',
								collegeId,
								courseId: course.id
							}
						)}
					>
						<CardContent>
							<Typography>{course.name}</Typography>
						</CardContent>
					</CardActionAreaLink>
					{university?.role === UserRole.ADMIN && (
						<Box alignSelf="center">
							<ModifyResourceAction
								// Shared
								resourceType="Course"
								resourceName={course.name}
								// Update
								updateForm={(onSuccess) => (
									<UpdateCourseForm
										collegeId={collegeId}
										course={course}
										onSuccess={onSuccess}
									/>
								)}
								// Delete
								onDelete={handleDeleteCourse}
								deleteLoading={deleteCourseLoading}
							/>
						</Box>
					)}
				</Box>
			</Card>
		);
	}
);
