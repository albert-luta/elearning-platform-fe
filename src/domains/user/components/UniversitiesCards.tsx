import { Box, Typography } from '@material-ui/core';
import { UserRole } from 'domains/shared/constants/UserRole';
import { GroupedByRoleUniversitiesObject } from 'generated/graphql';
import { FC, Fragment, memo } from 'react';
import { UniversityCard } from './UniversityCard';

const getRoleName = (role: string) => {
	switch (role) {
		case UserRole.ADMIN_UNIVERSITY:
			return 'Admin University';
		case UserRole.ADMIN_COLLEGE:
			return 'Admin College';
		case UserRole.TEACHER:
			return 'Teacher';
		case UserRole.STUDENT:
			return 'Student';
		default:
			return 'Student';
	}
};
const validRoles = Object.values(UserRole).reduce<Record<string, true>>(
	(acc, curr) => (acc[curr] ? acc : { ...acc, [curr]: true }),
	{}
);
const rolesPositions: Record<string, number> = {
	[UserRole.ADMIN_UNIVERSITY]: 0,
	[UserRole.ADMIN_COLLEGE]: 1,
	[UserRole.TEACHER]: 2,
	[UserRole.STUDENT]: 3
};

interface UniversitiesCardsProps {
	groupedByRoleUniversities?: GroupedByRoleUniversitiesObject[];
}

export const UniversitiesCards: FC<UniversitiesCardsProps> = memo(
	function UniversitiesCards({ groupedByRoleUniversities }) {
		if (groupedByRoleUniversities == null) {
			return null;
		}

		const filteredAndSortedUniversitiesGroups = groupedByRoleUniversities
			.filter(
				({ role, universities }) =>
					!!validRoles[role] && !!universities.length
			)
			.sort((a, b) => rolesPositions[a.role] - rolesPositions[b.role]);

		return (
			<>
				{filteredAndSortedUniversitiesGroups.map(
					({ role, universities }, roleIndex) => (
						<Fragment key={role}>
							<Typography variant="h6" gutterBottom>
								{getRoleName(role)}
							</Typography>
							{universities.map((university, universityIndex) => (
								<Fragment key={university.id}>
									<UniversityCard university={university} />
									{universityIndex !==
										universities.length - 1 && (
										<Box pb={1} />
									)}
								</Fragment>
							))}
							{roleIndex !==
								groupedByRoleUniversities.length - 1 && (
								<Box pb={2} />
							)}
						</Fragment>
					)
				)}
			</>
		);
	}
);
