import { Box } from '@material-ui/core';
import { Routes } from 'domains/shared/constants/Routes';
import { isRouteMatching } from 'domains/shared/utils/route/isRouteMatching';
import { useRouter } from 'next/router';
import { memo } from 'react';
import { AssignmentReview } from './AssignmentReview';

export const ExtraContentDrawerContent = memo(
	function ExtraContentDrawerContent() {
		const router = useRouter();

		return (
			<Box p={2}>
				{(() => {
					if (
						isRouteMatching(
							router.asPath,
							Routes.activity.ASSIGNMENT_REVIEW
						)
					) {
						return <AssignmentReview />;
					}

					if (
						isRouteMatching(
							router.asPath,
							Routes.activity.QUIZ_ACTIVE
						)
					) {
						return <>quiz active</>;
					}

					if (
						isRouteMatching(
							router.asPath,
							Routes.activity.QUIZ_REVIEW
						)
					) {
						return <>quiz review</>;
					}

					return null;
				})()}
			</Box>
		);
	}
);
