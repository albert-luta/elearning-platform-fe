import { makeVar } from '@apollo/client';
import { UserRole } from 'domains/shared/constants/UserRole';
import { UniversityObject } from 'generated/graphql';

export const selectedUniversityVar = makeVar<
	(UniversityObject & { role: UserRole }) | null
>(null);

export const resetUniversityVars = (): void => {
	selectedUniversityVar(null);
};
