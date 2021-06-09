import {
	Box,
	Collapse,
	ListItem,
	ListItemText,
	Typography
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import { CollegeObject } from 'generated/graphql';
import { FC, memo } from 'react';
import { CourseDashboardCard } from './CourseDashboardCard';

interface CollegeDashboardCollapsibleProps {
	college: CollegeObject;
}

export const CollegeDashboardCollapsible: FC<CollegeDashboardCollapsibleProps> = memo(
	function CollegeDashboardCollapsible({ college: { id, name, courses } }) {
		const [isOpen, , , toggleIsOpen] = useBooleanState();

		return (
			<>
				<ListItem button onClick={toggleIsOpen}>
					<ListItemText
						primary={name}
						primaryTypographyProps={{ variant: 'h5' }}
					/>
					{isOpen ? <ExpandLess /> : <ExpandMore />}
				</ListItem>

				<Collapse in={isOpen}>
					<Box p={2}>
						{courses.length ? (
							<Box
								display="grid"
								gridGap={8}
								gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
							>
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
