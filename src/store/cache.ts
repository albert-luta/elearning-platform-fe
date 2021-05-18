import { InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
	typePolicies: {
		UserObject: {
			fields: {
				groupedByRoleUniversities: {
					merge: false
				}
			}
		}
	}
});
