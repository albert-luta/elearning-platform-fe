import { UserRole } from './UserRole';

export interface Route {
	path: string;
	universityRoles?: UserRole[];
}

const inferRoutes = <T>(
	object: { [D in keyof T]: { [R in keyof T[D]]: Route } }
) => object;
export const Routes = inferRoutes({
	presentation: {
		LANDING: { path: '/' }
	},
	auth: {
		LOGIN_REGISTER: { path: '/app/auth' }
	},
	user: {
		DASHBOARD: { path: '/app' },
		PROFILE: { path: '/app/profile' },
		SETTINGS: { path: '/app/settings' }
	},
	userUniversity: {
		UPCOMING_ACTIVITIES: { path: '/app/:universityId/upcoming-activities' },
		GRADES: { path: '/app/:universityId/grades' },
		FORUM: { path: '/app/:universityId/forum' },
		QUESTION_BANK: {
			path: '/app/:universityId/question-bank',
			universityRoles: [UserRole.TEACHER, UserRole.ADMIN]
		}
	},
	university: {
		DASHBOARD: { path: '/app/:universityId' }
	},
	course: {
		DASHBOARD: {
			path: '/app/:universityId/:collegeId/:courseId'
		}
	},
	activity: {
		RESOURCE_DASHBOARD: {
			path: '/app/:universityId/:collegeId/:courseId/:activityId/resource'
		},

		ASSIGNMENT_DASHBOARD: {
			path:
				'/app/:universityId/:collegeId/:courseId/:activityId/assignment'
		},
		ASSIGNMENT_REVIEW: {
			path:
				'/app/:universityId/:collegeId/:courseId/:activityId/assignment/userAssignments/:userAssignmentId',
			universityRoles: [UserRole.TEACHER, UserRole.ADMIN]
		},

		QUIZ_DASHBOARD: {
			path: '/app/:universityId/:collegeId/:courseId/:activityId/quiz'
		},
		QUIZ_ACTIVE: {
			path:
				'/app/:universityId/:collegeId/:courseId/:activityId/quiz/active',
			universityRoles: [UserRole.STUDENT]
		},
		QUIZ_STUDENT_REVIEW: {
			path:
				'/app/:universityId/:collegeId/:courseId/:activityId/quiz/review',
			universityRoles: [UserRole.STUDENT]
		},
		QUIZ_TEACHER_REVIEW: {
			path:
				'/app/:universityId/:collegeId/:courseId/:activityId/quiz/userQuizes/:userQuizId',
			universityRoles: [UserRole.TEACHER, UserRole.ADMIN]
		}
	}
});

export const RoutesGroups = {
	PUBLIC: [
		...Object.values(Routes.presentation),
		...Object.values(Routes.auth)
	],
	OUTSIDE_UNIVERSITY: [
		...Object.values(Routes.presentation),
		...Object.values(Routes.auth),
		...Object.values(Routes.user)
	],
	// Drawers
	MENU_DRAWER_NOT_VISIBLE: [...Object.values(Routes.user)],
	EXTRA_CONTENT_DRAWER_VISIBLE: [
		Routes.activity.ASSIGNMENT_REVIEW,
		Routes.activity.QUIZ_ACTIVE,
		Routes.activity.QUIZ_STUDENT_REVIEW,
		Routes.activity.QUIZ_TEACHER_REVIEW
	],
	// Content layout
	SMALL_CONTENT_WIDTH: [...Object.values(Routes.user)],
	MEDIUM_CONTENT_WIDTH: [
		...Object.values(Routes.university),
		...Object.values(Routes.course)
	]
};

export const AllRoutesFlatArray = Object.values(Routes).reduce<Route[]>(
	(acc, domain) => [...acc, ...Object.values(domain)],
	[]
);
