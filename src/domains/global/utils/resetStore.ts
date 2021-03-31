import { client } from '../../../store';
import { resetGlobalReactiveVars } from '../reactive-vars';

export const resetStore = () => {
	client.cache.reset();
	resetGlobalReactiveVars();
};
