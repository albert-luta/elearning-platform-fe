import { useEffect, useState } from 'react';
import { REFRESH_TOKENS_INTERVAL_TIME } from '../constants';
import { useRefreshTokens } from './useRefreshTokens';

export const useRefreshTokensInterval = (): boolean => {
	const refreshTokens = useRefreshTokens();
	const [finishedInitialRequest, setFinishedInitialRequest] = useState(false);

	useEffect(() => {
		refreshTokens().then(() => {
			setFinishedInitialRequest(true);
		});
		const interval = setInterval(
			refreshTokens,
			REFRESH_TOKENS_INTERVAL_TIME
		);

		return () => clearInterval(interval);
	}, [refreshTokens]);

	return finishedInitialRequest;
};
