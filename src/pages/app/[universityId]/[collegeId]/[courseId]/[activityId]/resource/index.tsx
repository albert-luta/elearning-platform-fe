import { ActivityLoadingOrError } from 'domains/activity/components/ActivityLoadingOrError';
import { CommonActivityDisplay } from 'domains/activity/components/CommonActivityDisplay';
import { MyHead } from 'domains/shared/components/MyHead';
import { useActivityQuery } from 'generated/graphql';
import { useRouter } from 'next/router';

export default function ResourceDashboard() {
	const router = useRouter();
	const activityQuery = useActivityQuery({
		variables: {
			id: String(router.query.activityId)
		}
	});

	return (
		<>
			<MyHead title="Resource" />

			{(() => {
				if (
					activityQuery.loading ||
					!activityQuery.data ||
					activityQuery.data.activity.__typename !== 'ResourceObject'
				) {
					return (
						<ActivityLoadingOrError
							activityQuery={activityQuery}
							typename="ResourceObject"
						/>
					);
				}

				return (
					<CommonActivityDisplay
						activity={activityQuery.data.activity}
					/>
				);
			})()}
		</>
	);
}
