import { UserRole } from '../constants/UserRole';

export const formatUserRole = (userRole: UserRole): string => {
	switch (userRole) {
		case UserRole.ADMIN:
			return 'Admin';
		case UserRole.TEACHER:
			return 'Teacher';
		case UserRole.STUDENT:
			return 'Student';
	}
};
