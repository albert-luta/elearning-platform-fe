export const Routes = {
	PRESENTATION: '/',
	auth: {
		LOGIN_REGISTER: '/app/auth'
	},
	user: {
		DASHBOARD: '/app',
		SETTINGS: '/app/settings'
	}
};

export const RoutesGroups = {
	PUBLIC: [Routes.PRESENTATION, ...Object.values(Routes.auth)],
	NO_DRAWER: [...Object.values(Routes.user)]
};
