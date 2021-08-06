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
				},
				questionBank: {
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
		},
		SectionObject: {
			fields: {
				activities: {
					merge: false
				}
			}
		},
		QuestionObject: {
			fields: {
				answers: {
					merge: false
				}
			}
		},
		QuestionCategoryObject: {
			fields: {
				questions: {
					merge: false
				}
			}
		}
	},
	possibleTypes: {
		BaseActivityInterface: [
			'ResourceObject',
			'AssignmentObject',
			'QuizObject'
		]
	}
});
