import { Box, CircularProgress, Typography } from '@material-ui/core';
import { UpcomingActivityCard } from 'domains/activity/components/UpcomingActivityCard';
import { ContentHeader } from 'domains/shared/components/layout/ContentHeader';
import { MyHead } from 'domains/shared/components/MyHead';
import { useUpcomingActivitiesQuery } from 'generated/graphql';

export default function UpcomingActivities() {
	const upcomingActivities = useUpcomingActivitiesQuery();

	return (
		<>
			<MyHead title="Upcoming Activities" />

			<ContentHeader title="Upcoming Activities" />

			{(() => {
				if (upcomingActivities.loading) {
					return (
						<Box display="flex" justifyContent="center">
							<CircularProgress />
						</Box>
					);
				}

				if (!upcomingActivities.data) {
					return (
						<Typography color="textSecondary" align="center">
							There was a problem getting upcoming activities
						</Typography>
					);
				}

				if (!upcomingActivities.data.upcomingActivities.length) {
					return (
						<Typography color="textSecondary" align="center">
							There are no upcoming activities
						</Typography>
					);
				}

				return (
					<>
						{upcomingActivities.data.upcomingActivities.map(
							(activity, i) => (
								<Box key={activity.id} mt={i && 1.5}>
									<UpcomingActivityCard activity={activity} />
								</Box>
							)
						)}
					</>
				);
			})()}
		</>
	);
}
