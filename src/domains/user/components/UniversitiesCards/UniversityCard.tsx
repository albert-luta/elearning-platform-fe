import { Box, Card, CardHeader } from '@material-ui/core';
import { CardActionAreaLink } from 'domains/shared/components/card/CardActionAreaLink';
import { MyAvatar } from 'domains/shared/components/MyAvatar';
import { Routes } from 'domains/shared/constants/Routes';
import { UserRole } from 'domains/shared/constants/UserRole';
import { composeDynamicRoute } from 'domains/shared/utils/route/composeDynamicRoute';
import { UniversityObject } from 'generated/graphql';
import { FC, memo } from 'react';
import { UniversityCardAction } from './UniversityCardAction';

interface UniversityCardProps {
	university: UniversityObject;
	role: UserRole;
}

export const UniversityCard: FC<UniversityCardProps> = memo(
	function UniversityCard({ role, university }) {
		const { id, name, logo } = university;
		const universityHref = composeDynamicRoute(
			Routes.university.DASHBOARD.path,
			{
				universityId: id
			}
		);

		return (
			<Card>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
				>
					<CardActionAreaLink href={universityHref}>
						<CardHeader
							avatar={<MyAvatar src={logo} alt={name} />}
							title={name}
						/>
					</CardActionAreaLink>
					<UniversityCardAction role={role} university={university} />
				</Box>
			</Card>
		);
	}
);
