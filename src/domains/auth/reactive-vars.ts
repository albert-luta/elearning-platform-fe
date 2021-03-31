import { makeVar } from '@apollo/client';

export const accessTokenVar = makeVar<string | null>(null);

export const resetAuthReactiveVars = () => {
	accessTokenVar(null);
};
