import { client } from '../../../store';
import { resetGlobalVars } from '../reactiveVars';

export const resetStore = (): void => {
	client.cache.reset();
	resetGlobalVars();
};
