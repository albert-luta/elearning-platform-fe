import { Card, CardHeader } from '@material-ui/core';
import { CardActionAreaLink } from 'domains/shared/components/CardActionAreaLink';
import { MyAvatar } from 'domains/shared/components/MyAvatar';
import { Routes } from 'domains/shared/constants/Routes';
import { composeDynamicRoute } from 'domains/shared/utils/route/composeDynamicRoute';
import { UniversityObject } from 'generated/graphql';
import { FC, memo } from 'react';

interface UniversityCardProps {
	university: UniversityObject;
}

export const UniversityCard: FC<UniversityCardProps> = memo(
	function UniversityCard({ university: { id, name, logo } }) {
		const universityHref = composeDynamicRoute(
			Routes.university.DASHBOARD.path,
			{
				universityId: id
			}
		);

		return (
			<Card>
				<CardActionAreaLink href={universityHref}>
					<CardHeader
						avatar={<MyAvatar src={logo} alt={name} />}
						title={name}
					/>
				</CardActionAreaLink>
			</Card>
		);
	}
);
