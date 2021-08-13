import { resetActivityVars } from 'domains/activity/reactiveVars';
import { resetUniversityVars } from 'domains/university/reactiveVars';
import { resetAuthVars } from '../auth/reactiveVars';

export const resetGlobalVars = () => {
	resetAuthVars();
	resetUniversityVars();
	resetActivityVars();
};
