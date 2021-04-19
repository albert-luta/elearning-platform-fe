export const Routes = {
	PRESENTATION: '/',
	auth: {
		LOGIN_REGISTER: '/app/auth'
	},
	user: {
		DASHBOARD: '/app',
		PROFILE: '/app/profile',
		GRADES: '/app/grades',
		CALENDAR: '/app/calendar',
		SETTINGS: '/app/settings',
		CREATE_UNIVERSITY: '/app/create-university'
	},
	university: {
		DASHBOARD: '/app/university/:universityId'
	}
};

export const RoutesGroups = {
	PUBLIC: [Routes.PRESENTATION, ...Object.values(Routes.auth)],
	NO_DRAWER: [...Object.values(Routes.user)],
	USER: [...Object.values(Routes.user)]
};
