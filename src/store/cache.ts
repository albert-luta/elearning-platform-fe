import { InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				colleges: {
					merge: false
				},
				sections: {
					merge: false
				}
			}
		},
		UserObject: {
			fields: {
				groupedByRoleUniversities: {
					merge: false
				}
			}
		},
		CollegeObject: {
			fields: {
				courses: {
					merge: false
				}
			}
		}
	}
});
