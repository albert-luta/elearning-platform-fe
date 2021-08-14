import { FC, memo } from 'react';
import { Card, Box, Typography, CardContent } from '@material-ui/core';
import { Routes } from 'domains/shared/constants/Routes';
import { CardActionAreaLink } from 'domains/shared/components/card/CardActionAreaLink';
import { ActivityIcon } from 'domains/shared/components/icons/ActivityIcon';
import { getActivityRoute } from 'domains/shared/utils/getActivityRoute';
import { composeDynamicRoute } from 'domains/shared/utils/route/composeDynamicRoute';
import {
	ActivityType,
	UpcomingActivityFieldsFragment
} from 'generated/graphql';

interface UpcomingActivityCardProps {
	activity: UpcomingActivityFieldsFragment;
}

export const UpcomingActivityCard: FC<UpcomingActivityCardProps> = memo(
	function UpcomingActivityCard({ activity }) {
		return (
			<Card>
				<CardActionAreaLink
					href={composeDynamicRoute(
						Routes.activity[
							getActivityRoute(activity.type as ActivityType)
						].path,
						{
							universityId: activity.universityId,
							collegeId: activity.college.id,
							courseId: activity.course.id,
							activityId: activity.id
						}
					)}
				>
					<CardContent>
						<Box display="flex" alignItems="center">
							<Box pr={2} display="flex" alignItems="center">
								<ActivityIcon type={activity.type} />
							</Box>
							<div>
								<Typography>{activity.name}</Typography>
								{activity.__typename === 'AssignmentObject' && (
									<Typography color="textSecondary">
										Deadline:{' '}
										{new Date(
											activity.deadline
										).toLocaleString()}
									</Typography>
								)}
								{activity.__typename === 'QuizObject' && (
									<Typography color="textSecondary">
										Time Open:{' '}
										{new Date(
											activity.timeOpen
										).toLocaleString()}
									</Typography>
								)}
								<Typography
									color="textSecondary"
									variant="subtitle2"
								>
									College: {activity.college.name}
								</Typography>
								<Typography
									color="textSecondary"
									variant="subtitle2"
								>
									Course: {activity.course.name}
								</Typography>
							</div>
						</Box>
					</CardContent>
				</CardActionAreaLink>
			</Card>
		);
	}
);
