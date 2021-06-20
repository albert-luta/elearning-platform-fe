import { useReactiveVar } from '@apollo/client';
import {
	Box,
	Collapse,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Typography
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { CreateCourseForm } from 'domains/course/components/CourseForm/CreateCourseForm';
import { AddCard } from 'domains/shared/components/form/AddCard';
import { ModifyResourceAction } from 'domains/shared/components/ModifyResourceAction';
import { UserRole } from 'domains/shared/constants/UserRole';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import { selectedUniversityVar } from 'domains/university/reactiveVars';
import { CollegeObject, useDeleteCollegeMutation } from 'generated/graphql';
import { FC, memo, useCallback } from 'react';
import { deleteCollegeUpdate } from '../graphql/updates/deleteCollegeUpdate';
import { UpdateCollegeForm } from './CollegeForm/UpdateCollegeForm';
import { CourseDashboardCard } from './CourseDashboardCard';

interface CollegeDashboardCollapsibleProps {
	college: CollegeObject;
}

export const CollegeDashboardCollapsible: FC<CollegeDashboardCollapsibleProps> = memo(
	function CollegeDashboardCollapsible({ college }) {
		const { id, name, courses } = college;

		const [isOpen, , , toggleIsOpen] = useBooleanState();

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
			<>
				<ListItem button onClick={toggleIsOpen}>
					<Box display="flex" alignItems="center" pr={2}>
						{isOpen ? <ExpandLess /> : <ExpandMore />}
					</Box>
					<ListItemText
						primary={name}
						primaryTypographyProps={{ variant: 'h5' }}
					/>
					{university?.role === UserRole.ADMIN && (
						<ListItemSecondaryAction>
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
						</ListItemSecondaryAction>
					)}
				</ListItem>

				<Collapse in={isOpen}>
					<Box p={2}>
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
							<Typography color="textSecondary" align="center">
								There are no courses created yet
							</Typography>
						)}
					</Box>
				</Collapse>
			</>
		);
	}
);
