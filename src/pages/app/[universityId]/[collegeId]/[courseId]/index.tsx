import { useReactiveVar } from '@apollo/client';
import { Box, List, Typography } from '@material-ui/core';
import { SectionCollapsible } from 'domains/course/components/SectionCollapsible';
import { CreateSectionForm } from 'domains/course/components/SectionForm/CreateSectionForm';
import { AddListItem } from 'domains/shared/components/list/AddListItem';
import { MyHead } from 'domains/shared/components/MyHead';
import { MySkeleton } from 'domains/shared/components/MySkeleton';
import { UserRole } from 'domains/shared/constants/UserRole';
import { selectedUniversityVar } from 'domains/university/reactiveVars';
import { useSectionsQuery } from 'generated/graphql';
import { useRouter } from 'next/router';

export default function CourseDashboard() {
	const university = useReactiveVar(selectedUniversityVar);
	const router = useRouter();
	const sections = useSectionsQuery({
		variables: {
			courseId: String(router.query.courseId)
		}
	});

	const canManipulateSections = [UserRole.ADMIN, UserRole.TEACHER].includes(
		university?.role ?? UserRole.STUDENT
	);

	return (
		<>
			<MyHead title="Course" />

			{(() => {
				if (sections.loading) {
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

				if (!sections.data?.sections.length) {
					return (
						<Box py={1} px={2}>
							<Box pb={1}>
								<Typography
									color="textSecondary"
									align="center"
								>
									There are no sections created yet
								</Typography>
							</Box>
							{canManipulateSections && (
								<AddListItem
									variant="h5"
									resourceType="Section"
									form={(onSuccess) => (
										<CreateSectionForm
											courseId={String(
												router.query.courseId
											)}
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
						{canManipulateSections && (
							<AddListItem
								variant="h5"
								resourceType="Section"
								form={(onSuccess) => (
									<CreateSectionForm
										courseId={String(router.query.courseId)}
										onSuccess={onSuccess}
									/>
								)}
							/>
						)}
						{sections.data.sections.map((section) => (
							<SectionCollapsible
								key={section.id}
								section={section}
							/>
						))}
					</List>
				);
			})()}
		</>
	);
}
