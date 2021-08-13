import { Box, CircularProgress, Typography } from '@material-ui/core';
import { useActivityQuery } from 'generated/graphql';
import { FC, memo } from 'react';

interface ActivityLoadingOrErrorProps {
	activityQuery: ReturnType<typeof useActivityQuery>;
	typename: 'ResourceObject' | 'AssignmentObject' | 'QuizObject';
}

export const ActivityLoadingOrError: FC<ActivityLoadingOrErrorProps> = memo(
	function ActivityLoadingOrError({ activityQuery, typename }) {
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

		if (activityQuery.data.activity.__typename !== typename) {
			return (
				<Typography align="center" color="textSecondary">
					{typename.replace('Object', '')} doesn&quot;t exist
				</Typography>
			);
		}

		return null;
	}
);
