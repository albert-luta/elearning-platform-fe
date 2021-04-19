import { useCallback } from 'react';
import { useRefreshTokensMutation } from 'generated/graphql';
import { accessTokenVar } from '../reactiveVars';

export const useRefreshTokens = () => {
	const [refreshTokens] = useRefreshTokensMutation({
		fetchPolicy: 'no-cache'
	});

	const handleRefreshTokens = useCallback(async () => {
		try {
			const { data } = await refreshTokens();
			accessTokenVar(data?.refreshTokens.accessToken ?? null);
		} catch {}
	}, [refreshTokens]);

	return handleRefreshTokens;
};
