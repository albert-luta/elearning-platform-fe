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
		DASHBOARD: { path: '/app/university/:universityId' }
	}
});

export const RoutesGroups = {
	PUBLIC: [
		...Object.values(Routes.presentation),
		...Object.values(Routes.auth)
	],
	// Only for private(not public) routes
	NO_DRAWER: [...Object.values(Routes.user)],
	SMALL_CONTENT_WIDTH: [...Object.values(Routes.user)],
	MEDIUM_CONTENT_WIDTH: [...Object.values(Routes.university)]
};

export const AllRoutesFlatArray = Object.values(Routes).reduce<Route[]>(
	(acc, domain) => [...acc, ...Object.values(domain)],
	[]
);
