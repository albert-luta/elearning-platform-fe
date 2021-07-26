import { Box, CircularProgress, Typography } from '@material-ui/core';
import { AssignmentSpecificDisplay } from 'domains/activity/components/AssignmentSpecificDisplay';
import { CommonActivityDisplay } from 'domains/activity/components/CommonActivityDisplay';
import { QuizSpecificDisplay } from 'domains/activity/components/QuizSpecificDisplay';
import { MyHead } from 'domains/shared/components/MyHead';
import { useActivityQuery } from 'generated/graphql';
import { useRouter } from 'next/router';

export default function ActivityDashboard() {
	const router = useRouter();
	const activityQuery = useActivityQuery({
		variables: {
			id: String(router.query.activityId)
		}
	});

	return (
		<>
			<MyHead title="Activity" />

			{(() => {
				if (activityQuery.loading) {
					return (
						<Box display="flex" justifyContent="center">
							<CircularProgress />
						</Box>
					);
				}

				if (!activityQuery.data) {
					return (
						<Typography align="center" color="textSecondary">
							An error occurred, please try again later
						</Typography>
					);
				}

				const {
					data: { activity }
				} = activityQuery;

				return (
					<>
						<CommonActivityDisplay activity={activity} />

						{activity.__typename !== 'ResourceObject' && (
							<Box mt={4}>
								<Typography variant="h5">
									{activity.__typename === 'AssignmentObject'
										? 'Assignment'
										: 'Quiz'}{' '}
									status
								</Typography>

								<Box mt={2}>
									{activity.__typename ===
										'AssignmentObject' && (
										<AssignmentSpecificDisplay
											activity={activity}
										/>
									)}
									{activity.__typename === 'QuizObject' && (
										<QuizSpecificDisplay
											activity={activity}
										/>
									)}
								</Box>
							</Box>
						)}
					</>
				);
			})()}
		</>
	);
}
