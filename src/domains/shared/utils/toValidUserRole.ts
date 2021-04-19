import { UserRole } from '../constants/UserRole';

export const toValidUserRole = (role: string): UserRole => {
	return role as UserRole;
};
