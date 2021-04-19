import { Card, CardActionArea, CardHeader, Avatar } from '@material-ui/core';
import { Routes } from 'domains/shared/constants/Routes';
import { composeDynamicRoute } from 'domains/shared/utils/composeDynamicRoute';
import { UniversityObject } from 'generated/graphql';
import { useRouter } from 'next/router';
import { FC, memo, useCallback } from 'react';

interface UniversityCardProps {
	university: UniversityObject;
}

export const UniversityCard: FC<UniversityCardProps> = memo(
	function UniversityCard({ university: { id, name } }) {
		const router = useRouter();
		const redirectToUniversity = useCallback(() => {
			router.push(
				composeDynamicRoute(Routes.university.DASHBOARD, {
					universityId: id
				})
			);
		}, [router, id]);

		return (
			<Card>
				<CardActionArea onClick={redirectToUniversity}>
					<CardHeader avatar={<Avatar>:)</Avatar>} title={name} />
				</CardActionArea>
			</Card>
		);
	}
);
