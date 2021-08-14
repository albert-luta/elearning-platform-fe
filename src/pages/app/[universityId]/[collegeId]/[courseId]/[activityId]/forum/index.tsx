import { Box } from '@material-ui/core';
import { ActivityLoadingOrError } from 'domains/activity/components/ActivityLoadingOrError';
import { CommonActivityDisplay } from 'domains/activity/components/CommonActivityDisplay';
import { ForumSpecificDisplay } from 'domains/activity/components/ForumSpecificDisplay';
import { UserActivityReviewInfo } from 'domains/activity/components/UserActivityReviewInfo';
import { MyHead } from 'domains/shared/components/MyHead';
import { UserRole } from 'domains/shared/constants/UserRole';
import { useActivityQuery } from 'generated/graphql';
import { useRouter } from 'next/router';

export default function ForumDashboard() {
	const router = useRouter();
	const activityQuery = useActivityQuery({
		variables: {
			id: String(router.query.activityId)
		}
	});

	return (
		<>
			<MyHead title="Forum" />

			{(() => {
				if (
					activityQuery.loading ||
					!activityQuery.data ||
					activityQuery.data.activity.__typename !== 'ForumObject'
				) {
					return (
						<ActivityLoadingOrError
							activityQuery={activityQuery}
							typename="ForumObject"
						/>
					);
				}

				return (
					<>
						<UserActivityReviewInfo
							user={
								activityQuery.data.activity.universityUser.user
							}
							role={
								activityQuery.data.activity.universityUser.role
									.name as UserRole
							}
						/>
						<Box mt={2}>
							<CommonActivityDisplay
								activity={activityQuery.data.activity}
							/>
						</Box>
						<Box mt={2}>
							<ForumSpecificDisplay
								activity={activityQuery.data.activity}
							/>
						</Box>
					</>
				);
			})()}
		</>
	);
}
