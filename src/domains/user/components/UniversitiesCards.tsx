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
	}
};

interface UniversitiesCardsProps {
	groupedByRoleUniversities?: GroupedByRoleUniversitiesObject[];
}

export const UniversitiesCards: FC<UniversitiesCardsProps> = memo(
	function UniversitiesCards({ groupedByRoleUniversities }) {
		if (groupedByRoleUniversities == null) {
			return null;
		}

		const validRoles = Object.values(UserRole).reduce<Record<string, true>>(
			(acc, curr) => (acc[curr] ? acc : { ...acc, [curr]: true }),
			{}
		);
		const noUnknownUserRoleGroups = groupedByRoleUniversities.filter(
			({ role }) => !!validRoles[role]
		);

		const noEmptyUniversitiesGroups = noUnknownUserRoleGroups.filter(
			({ universities }) => !!universities.length
		);

		return (
			<>
				{noEmptyUniversitiesGroups.map(
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
