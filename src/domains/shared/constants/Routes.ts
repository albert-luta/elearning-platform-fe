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
	NO_DRAWER: [...Object.values(Routes.user)]
};

export const AllRoutesFlatArray = Object.values(Routes).reduce<Route[]>(
	(acc, domain) => [...acc, ...Object.values(domain)],
	[]
);
