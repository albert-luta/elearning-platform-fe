import { Box } from '@material-ui/core';
import { ActivityLoadingOrError } from 'domains/activity/components/ActivityLoadingOrError';
import { AssignmentSpecificDisplay } from 'domains/activity/components/AssignmentSpecificDisplay';
import { CommonActivityDisplay } from 'domains/activity/components/CommonActivityDisplay';
import { MyHead } from 'domains/shared/components/MyHead';
import { useActivityQuery } from 'generated/graphql';
import { useRouter } from 'next/router';

export default function AssignmentDashboard() {
	const router = useRouter();
	const activityQuery = useActivityQuery({
		variables: {
			id: String(router.query.activityId)
		}
	});

	return (
		<>
			<MyHead title="Assignment" />

			{(() => {
				if (
					activityQuery.loading ||
					!activityQuery.data ||
					activityQuery.data.activity.__typename !==
						'AssignmentObject'
				) {
					return (
						<ActivityLoadingOrError
							activityQuery={activityQuery}
							typename="AssignmentObject"
						/>
					);
				}

				return (
					<>
						<CommonActivityDisplay
							activity={activityQuery.data.activity}
						/>
						<Box mt={2}>
							<AssignmentSpecificDisplay
								activity={activityQuery.data.activity}
							/>
						</Box>
					</>
				);
			})()}
		</>
	);
}
