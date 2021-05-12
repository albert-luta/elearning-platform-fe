import { SelectedUniversityVar } from 'domains/university/reactiveVars';
import { MeQuery } from 'generated/graphql';
import { UserRole } from '../constants/UserRole';

export const findUniversity = (
	id: string,
	groupedByRoleUniversities: MeQuery['me']['groupedByRoleUniversities']
): SelectedUniversityVar | null => {
	for (const { role, universities } of groupedByRoleUniversities) {
		for (const university of universities) {
			if (university.id === id) {
				return {
					...university,
					role: role as UserRole
				};
			}
		}
	}

	return null;
};
