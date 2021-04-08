import { client } from '../../../store';
import { resetGlobalReactiveVars } from '../reactiveVars';

export const resetStore = () => {
	client.cache.reset();
	resetGlobalReactiveVars();
};
