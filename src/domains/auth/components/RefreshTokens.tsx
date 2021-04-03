import { FC, memo, useCallback, useEffect } from 'react';
import { useRefreshTokensMutation } from 'generated/graphql';
import { REFRESH_TOKENS_INTERVAL_TIME } from '../constants';
import { accessTokenVar } from '../reactive-vars';

export const RefreshTokens: FC = memo(function RefreshTokens({ children }) {
	const [refreshTokensMutation] = useRefreshTokensMutation({
		fetchPolicy: 'no-cache'
	});

	const refreshTokens = useCallback(async () => {
		try {
			const { data } = await refreshTokensMutation();
			accessTokenVar(data?.refreshTokens.accessToken ?? null);
		} catch {}
	}, [refreshTokensMutation]);

	useEffect(() => {
		refreshTokens();
		const interval = setInterval(
			refreshTokens,
			REFRESH_TOKENS_INTERVAL_TIME
		);

		return () => clearInterval(interval);
	}, [refreshTokens]);

	return <>{children}</>;
});
