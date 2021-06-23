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
import { ModifyResourceAction } from 'domains/shared/components/ModifyResourceAction';
import { UserRole } from 'domains/shared/constants/UserRole';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import { selectedUniversityVar } from 'domains/university/reactiveVars';
import { SectionObject, useDeleteSectionMutation } from 'generated/graphql';
import { FC, memo, useCallback } from 'react';
import { deleteSectionUpdate } from '../graphql/updates/deleteSectionUpdate';
import { UpdateSectionForm } from './SectionForm/UpdateSectionForm';

interface SectionCollapsibleProps {
	section: SectionObject;
}

export const SectionCollapsible: FC<SectionCollapsibleProps> = memo(
	function SectionCollapsible({ section }) {
		const { id, name } = section;

		const [isOpen, , , toggleIsOpen] = useBooleanState();

		const university = useReactiveVar(selectedUniversityVar);

		const [
			deleteSection,
			{ loading: deleteSectionLoading }
		] = useDeleteSectionMutation({ update: deleteSectionUpdate });
		const handleDeleteSection = useCallback((): void => {
			deleteSection({
				variables: {
					id
				}
			}).catch(() => null);
		}, [deleteSection, id]);

		const canManipulateSections = [
			UserRole.ADMIN,
			UserRole.TEACHER
		].includes(university?.role ?? UserRole.STUDENT);

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
					{canManipulateSections && (
						<ListItemSecondaryAction>
							<ModifyResourceAction
								// Shared
								resourceName={name}
								resourceType="Section"
								// Update
								updateForm={(onSuccess) => (
									<UpdateSectionForm
										section={section}
										onSuccess={onSuccess}
									/>
								)}
								// Delete
								onDelete={handleDeleteSection}
								deleteLoading={deleteSectionLoading}
							/>
						</ListItemSecondaryAction>
					)}
				</ListItem>

				<Collapse in={isOpen}>
					<Box p={2}>
						<Typography color="textSecondary" align="center">
							There are no activities created yet
						</Typography>
						{/* {courses.length ? ( */}
						{/* 	<Box */}
						{/* 		display="grid" */}
						{/* 		gridGap={8} */}
						{/* 		gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" */}
						{/* 	> */}
						{/* 		{university?.role === UserRole.ADMIN && ( */}
						{/* 			<AddCard */}
						{/* 				resourceType="Course" */}
						{/* 				form={(onSuccess) => ( */}
						{/* 					<CreateCourseForm */}
						{/* 						onSuccess={onSuccess} */}
						{/* 						collegeId={section.id} */}
						{/* 					/> */}
						{/* 				)} */}
						{/* 			/> */}
						{/* 		)} */}
						{/* 		{courses.map((course) => ( */}
						{/* 			<CourseDashboardCard */}
						{/* 				key={course.id} */}
						{/* 				collegeId={id} */}
						{/* 				course={course} */}
						{/* 			/> */}
						{/* 		))} */}
						{/* 	</Box> */}
						{/* ) : ( */}
						{/* 	<Typography color="textSecondary" align="center"> */}
						{/* 		There are no activities created yet */}
						{/* 	</Typography> */}
						{/* )} */}
					</Box>
				</Collapse>
			</>
		);
	}
);
