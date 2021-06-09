import { useReactiveVar } from '@apollo/client';
import {
	Box,
	Collapse,
	ListItem,
	ListItemText,
	Typography
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { ListLinkItem } from 'domains/shared/components/list/ListLinkItem';
import { Routes } from 'domains/shared/constants/Routes';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import { composeDynamicRoute } from 'domains/shared/utils/route/composeDynamicRoute';
import { selectedUniversityVar } from 'domains/university/reactiveVars';
import { CollegeObject } from 'generated/graphql';
import { FC, memo } from 'react';

interface CollegeDrawerCollapsibleProps {
	college: CollegeObject;
	onClose?: () => void;
}

export const CollegeDrawerCollapsible: FC<CollegeDrawerCollapsibleProps> = memo(
	function CollegeDrawerCollapsible({
		college: { id, name, courses },
		onClose
	}) {
		const university = useReactiveVar(selectedUniversityVar);
		const [isOpen, , , toggleIsOpen] = useBooleanState();

		return (
			<>
				<ListItem button onClick={toggleIsOpen}>
					<ListItemText
						primary={name}
						primaryTypographyProps={{ variant: 'h6' }}
					/>
					{isOpen ? <ExpandLess /> : <ExpandMore />}
				</ListItem>

				<Collapse in={isOpen}>
					{courses.length ? (
						<Box pl={4}>
							{courses.map((course) => (
								<ListLinkItem
									key={course.id}
									button
									onClick={onClose}
									href={composeDynamicRoute(
										Routes.course.DASHBOARD.path,
										{
											universityId:
												university?.id ?? 'placeholder',
											collegeId: id,
											courseId: course.id
										}
									)}
								>
									<ListItemText primary={course.name} />
								</ListLinkItem>
							))}
						</Box>
					) : (
						<Box py={1} pl={6} pr={2}>
							<Typography color="textSecondary">
								There are no courses created yet
							</Typography>
						</Box>
					)}
				</Collapse>
			</>
		);
	}
);
