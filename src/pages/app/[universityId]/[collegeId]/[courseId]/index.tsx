import { useReactiveVar } from '@apollo/client';
import {
	Box,
	IconButton,
	List,
	Typography,
	Tooltip,
	Dialog
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { SectionCollapsible } from 'domains/course/components/SectionCollapsible';
import { CreateSectionForm } from 'domains/course/components/SectionForm/CreateSectionForm';
import { Content } from 'domains/shared/components/layout/Content';
import { ContentHeader } from 'domains/shared/components/layout/ContentHeader';
import { MyHead } from 'domains/shared/components/MyHead';
import { MySkeleton } from 'domains/shared/components/MySkeleton';
import { UserRole } from 'domains/shared/constants/UserRole';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
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
	const [
		isCreateSectionDialogOpen,
		openCreateSectionDialog,
		closeCreateSectionDialog
	] = useBooleanState();

	return (
		<>
			<MyHead title="Course" />
			<ContentHeader
				title="Sections"
				action={
					canManipulateSections && (
						<Tooltip title="Create Section">
							<IconButton onClick={openCreateSectionDialog}>
								<Add />
							</IconButton>
						</Tooltip>
					)
				}
			/>

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
							<Typography color="textSecondary" align="center">
								There are no sections created yet
							</Typography>
						</Box>
					);
				}

				return (
					<List>
						{sections.data.sections.map((section) => (
							<SectionCollapsible
								key={section.id}
								section={section}
							/>
						))}
					</List>
				);
			})()}

			<Dialog
				open={isCreateSectionDialogOpen}
				onClose={closeCreateSectionDialog}
				fullWidth
				maxWidth="xs"
			>
				<Content>
					<ContentHeader title="Create Section" />
					<CreateSectionForm
						courseId={String(router.query.courseId)}
						onSuccess={closeCreateSectionDialog}
					/>
				</Content>
			</Dialog>
		</>
	);
}
