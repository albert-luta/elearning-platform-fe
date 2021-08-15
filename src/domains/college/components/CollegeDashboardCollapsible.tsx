import { useReactiveVar } from '@apollo/client';
import { Box, Typography } from '@material-ui/core';
import { CreateCourseForm } from 'domains/course/components/CourseForm/CreateCourseForm';
import { AddCard } from 'domains/shared/components/card/AddCard';
import { ListItemCollapsible } from 'domains/shared/components/list/ListItemCollapsible';
import { ModifyResourceAction } from 'domains/shared/components/ModifyResourceAction';
import { UserRole } from 'domains/shared/constants/UserRole';
import { selectedUniversityVar } from 'domains/university/reactiveVars';
import {
	CollegeFieldsFragment,
	useDeleteCollegeMutation
} from 'generated/graphql';
import { FC, memo, useCallback } from 'react';
import { deleteCollegeUpdate } from '../graphql/updates/deleteCollegeUpdate';
import { UpdateCollegeForm } from './CollegeForm/UpdateCollegeForm';
import { CourseDashboardCard } from './CourseDashboardCard';

interface CollegeDashboardCollapsibleProps {
	college: CollegeFieldsFragment;
}

export const CollegeDashboardCollapsible: FC<CollegeDashboardCollapsibleProps> = memo(
	function CollegeDashboardCollapsible({ college }) {
		const { id, name, courses } = college;

		const university = useReactiveVar(selectedUniversityVar);

		const [
			deleteCollege,
			{ loading: deleteCollegeLoading }
		] = useDeleteCollegeMutation({ update: deleteCollegeUpdate });
		const handleDeleteCollege = useCallback((): void => {
			deleteCollege({
				variables: {
					id
				}
			}).catch(() => null);
		}, [deleteCollege, id]);

		return (
			<ListItemCollapsible
				name={name}
				action={
					university?.role === UserRole.ADMIN && (
						<ModifyResourceAction
							// Shared
							resourceName={name}
							resourceType="College"
							// Update
							updateForm={(onSuccess) => (
								<UpdateCollegeForm
									college={college}
									onSuccess={onSuccess}
								/>
							)}
							// Delete
							onDelete={handleDeleteCollege}
							deleteLoading={deleteCollegeLoading}
						/>
					)
				}
			>
				{courses.length ? (
					<Box
						display="grid"
						gridGap={8}
						gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
					>
						{university?.role === UserRole.ADMIN && (
							<AddCard
								resourceType="Course"
								form={(onSuccess) => (
									<CreateCourseForm
										onSuccess={onSuccess}
										collegeId={college.id}
									/>
								)}
							/>
						)}
						{courses.map((course) => (
							<CourseDashboardCard
								key={course.id}
								collegeId={id}
								course={course}
							/>
						))}
					</Box>
				) : (
					<>
						{university?.role === UserRole.ADMIN && (
							<Box mb={2}>
								<AddCard
									resourceType="Course"
									form={(onSuccess) => (
										<CreateCourseForm
											onSuccess={onSuccess}
											collegeId={college.id}
										/>
									)}
								/>
							</Box>
						)}
						<Typography color="textSecondary" align="center">
							There are no courses created yet
						</Typography>
					</>
				)}
			</ListItemCollapsible>
		);
	}
);
