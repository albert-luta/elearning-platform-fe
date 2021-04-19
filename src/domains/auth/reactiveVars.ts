import { makeVar } from '@apollo/client';

export const accessTokenVar = makeVar<string | null>(null);

export const resetAuthVars = () => {
	accessTokenVar(null);
};
