import { Box, Typography } from '@material-ui/core';
import { ActivityIcon } from 'domains/shared/components/icons/ActivityIcon';
import { ListItemCollapsible } from 'domains/shared/components/list/ListItemCollapsible';
import { GradesQuery } from 'generated/graphql';
import { FC, memo } from 'react';

interface CollegeGradeCollapsibleProps {
	college: GradesQuery['colleges'][number];
}

export const CollegeGradeCollapsible: FC<CollegeGradeCollapsibleProps> = memo(
	function CollegeGradeCollapsible({ college }) {
		return (
			<ListItemCollapsible name={college.name}>
				{college.courses.map((course) => (
					<Box pl={2} key={course.id}>
						<ListItemCollapsible variant="body1" name={course.name}>
							{course.activitiesGrade.map((activity, i) => (
								<Box
									key={activity.activityId}
									pl={2}
									mt={i && 2}
									display="flex"
									alignItems="center"
									justifyContent="space-between"
								>
									<Box display="flex" alignItems="center">
										<Box
											pr={2}
											display="flex"
											justifyContent="center"
											alignItems="center"
										>
											<ActivityIcon
												type={activity.activityType}
											/>
										</Box>
										<Typography>
											{activity.activityName}
										</Typography>
									</Box>
									<Typography>
										{activity.grade ?? 'Not graded yet'} /{' '}
										{activity.maxGrade}
									</Typography>
								</Box>
							))}
						</ListItemCollapsible>
					</Box>
				))}
			</ListItemCollapsible>
		);
	}
);
