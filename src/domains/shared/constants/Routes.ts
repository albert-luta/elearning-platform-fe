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
		GRADES: { path: '/app/grades' },
		CALENDAR: { path: '/app/calendar' },
		SETTINGS: { path: '/app/settings' }
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
		} // ,
		// QUIZ_ACTIVE: {
		// 	path:
		// 		'/app/:universityId/:collegeId/:courseId/:activityId/quiz/active'
		// },
		// QUIZ_REVIEW: {
		// 	path:
		// 		'/app/:universityId/:collegeId/:courseId/:activityId/quiz/userQuizes/:userQuizeId'
		// }
	}
});

export const RoutesGroups = {
	PUBLIC: [
		...Object.values(Routes.presentation),
		...Object.values(Routes.auth)
	],
	// Drawer
	NO_DRAWER: [...Object.values(Routes.user)],
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
