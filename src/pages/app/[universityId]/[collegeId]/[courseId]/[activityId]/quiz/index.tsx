import { Box } from '@material-ui/core';
import { ActivityLoadingOrError } from 'domains/activity/components/ActivityLoadingOrError';
import { CommonActivityDisplay } from 'domains/activity/components/CommonActivityDisplay';
import { QuizSpecificDisplay } from 'domains/activity/components/QuizSpecificDisplay';
import { MyHead } from 'domains/shared/components/MyHead';
import { useActivityQuery } from 'generated/graphql';
import { useRouter } from 'next/router';

export default function QuizDashboard() {
	const router = useRouter();
	const activityQuery = useActivityQuery({
		variables: {
			id: String(router.query.activityId)
		}
	});

	return (
		<>
			<MyHead title="Quiz" />

			{(() => {
				if (
					activityQuery.loading ||
					!activityQuery.data ||
					activityQuery.data.activity.__typename !== 'QuizObject'
				) {
					return (
						<ActivityLoadingOrError
							activityQuery={activityQuery}
							typename="QuizObject"
						/>
					);
				}

				return (
					<>
						<CommonActivityDisplay
							activity={activityQuery.data.activity}
						/>
						<Box mt={4}>
							<QuizSpecificDisplay
								activity={activityQuery.data.activity}
							/>
						</Box>
					</>
				);
			})()}
		</>
	);
}
