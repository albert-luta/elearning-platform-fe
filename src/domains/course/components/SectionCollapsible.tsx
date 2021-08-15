import { useReactiveVar } from '@apollo/client';
import { Box, Typography } from '@material-ui/core';
import { AddButton } from 'domains/shared/components/buttons/AddButton';
import { ButtonLink } from 'domains/shared/components/buttons/ButtonLink';
import { ListItemCollapsible } from 'domains/shared/components/list/ListItemCollapsible';
import { ModifyResourceAction } from 'domains/shared/components/ModifyResourceAction';
import { Routes } from 'domains/shared/constants/Routes';
import { UserRole } from 'domains/shared/constants/UserRole';
import { composeDynamicRoute } from 'domains/shared/utils/route/composeDynamicRoute';
import { selectedUniversityVar } from 'domains/university/reactiveVars';
import {
	ActivityType,
	SectionFieldsFragment,
	useDeleteActivityMutation,
	useDeleteSectionMutation
} from 'generated/graphql';
import { useRouter } from 'next/router';
import { FC, memo, useCallback } from 'react';
import { deleteActivityUpdate } from '../graphql/updates/deleteActivityUpdate';
import { deleteSectionUpdate } from '../graphql/updates/deleteSectionUpdate';
import { CreateActivityForm } from './ActivityForm/CreateActivityForm';
import { UpdateActivityForm } from './ActivityForm/UpdateActivityForm';
import { ActivityIcon } from '../../shared/components/icons/ActivityIcon';
import { UpdateSectionForm } from './SectionForm/UpdateSectionForm';
import { getActivityRoute } from 'domains/shared/utils/getActivityRoute';

interface SectionCollapsibleProps {
	section: SectionFieldsFragment;
}

export const SectionCollapsible: FC<SectionCollapsibleProps> = memo(
	function SectionCollapsible({ section }) {
		const { id, name, activities, courseId } = section;

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

		const [
			deleteActivity,
			{ loading: deleteActivityLoading }
		] = useDeleteActivityMutation({
			update: deleteActivityUpdate(courseId)
		});

		return (
			<ListItemCollapsible
				name={name}
				action={
					haveManipulationPermissions && (
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
					)
				}
			>
				{haveManipulationPermissions && (
					<Box pb={0.5}>
						<AddButton
							fullWidth
							resourceType="Activity"
							dialogMaxWidth="sm"
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
						<Box
							key={activity.id}
							mt={haveManipulationPermissions ? 0 : i && 0.5}
							display="flex"
							alignItems="center"
						>
							<ButtonLink
								style={{ textTransform: 'none' }}
								href={composeDynamicRoute(
									Routes.activity[
										getActivityRoute(
											activity.type as ActivityType
										)
									].path,
									{
										universityId: String(
											router.query.universityId
										),
										collegeId: String(
											router.query.collegeId
										),
										courseId: String(router.query.courseId),
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
										<ActivityIcon type={activity.type} />
									</Box>
									<Typography>{activity.name}</Typography>
								</Box>
							</ButtonLink>
							{haveManipulationPermissions && (
								<ModifyResourceAction
									// Shared
									resourceName={activity.name}
									resourceType={activity.type}
									updateDialogMaxWidth="sm"
									// Update
									updateForm={(onSuccess) => (
										<UpdateActivityForm
											activity={activity}
											onSuccess={onSuccess}
										/>
									)}
									// Delete
									onDelete={() => {
										deleteActivity({
											variables: {
												id: activity.id,
												type: activity.type as ActivityType
											}
										}).catch(() => null);
									}}
									deleteLoading={deleteActivityLoading}
								/>
							)}
						</Box>
					))
				) : (
					<Typography color="textSecondary" align="center">
						There are no activities created yet
					</Typography>
				)}
			</ListItemCollapsible>
		);
	}
);
