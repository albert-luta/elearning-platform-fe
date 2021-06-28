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
import { AddButton } from 'domains/shared/components/buttons/AddButton';
import { ButtonLink } from 'domains/shared/components/buttons/ButtonLink';
import { ModifyResourceAction } from 'domains/shared/components/ModifyResourceAction';
import { Routes } from 'domains/shared/constants/Routes';
import { UserRole } from 'domains/shared/constants/UserRole';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import { composeDynamicRoute } from 'domains/shared/utils/route/composeDynamicRoute';
import { selectedUniversityVar } from 'domains/university/reactiveVars';
import { SectionObject, useDeleteSectionMutation } from 'generated/graphql';
import { useRouter } from 'next/router';
import { FC, memo, useCallback } from 'react';
import { deleteSectionUpdate } from '../graphql/updates/deleteSectionUpdate';
import { CreateActivityForm } from './ActivityForm/CreateActivityForm';
import { ActivityIcon } from './ActivityIcon';
import { UpdateSectionForm } from './SectionForm/UpdateSectionForm';

interface SectionCollapsibleProps {
	section: SectionObject;
}

export const SectionCollapsible: FC<SectionCollapsibleProps> = memo(
	function SectionCollapsible({ section }) {
		const { id, name, activities, courseId } = section;

		const [isOpen, , , toggleIsOpen] = useBooleanState();

		const university = useReactiveVar(selectedUniversityVar);
		const router = useRouter();

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

		const haveManipulationPermissions = [
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
					{haveManipulationPermissions && (
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
						{haveManipulationPermissions && (
							<Box pb={0.5}>
								<AddButton
									fullWidth
									resourceType="Activity"
									form={(onSuccess) => (
										<CreateActivityForm
											courseId={courseId}
											sectionId={id}
											onSuccess={onSuccess}
										/>
									)}
								/>
							</Box>
						)}
						{activities.length ? (
							activities.map((activity, i) => (
								<Box key={activity.id} mt={i && 0.5}>
									<ButtonLink
										style={{ textTransform: 'none' }}
										href={composeDynamicRoute(
											Routes.activity.DASHBOARD.path,
											{
												universityId: String(
													router.query.universityId
												),
												collegeId: String(
													router.query.collegeId
												),
												courseId: String(
													router.query.courseId
												),
												activityId: activity.id
											}
										)}
										fullWidth
									>
										<Box
											width="100%"
											display="flex"
											alignItems="center"
										>
											<Box
												pr={1.5}
												display="flex"
												alignItems="center"
											>
												<ActivityIcon
													type={activity.type}
												/>
											</Box>
											<Typography>
												{activity.name}
											</Typography>
										</Box>
									</ButtonLink>
								</Box>
							))
						) : (
							<Typography color="textSecondary" align="center">
								There are no activities created yet
							</Typography>
						)}
					</Box>
				</Collapse>
			</>
		);
	}
);
