import { makeVar } from '@apollo/client';
import { UserRole } from 'domains/shared/constants/UserRole';
import { UniversityObject } from 'generated/graphql';

export type SelectedUniversityVar = UniversityObject & { role: UserRole };
export const selectedUniversityVar = makeVar<SelectedUniversityVar | null>(
	null
);

export const resetUniversityVars = (): void => {
	selectedUniversityVar(null);
};
