import { NextRouterEvent } from 'domains/shared/constants/NextRouterEvent';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSyncSelectedUniversity } from './useSyncSelectedUniversity';

export const useKeepSelectedUniversityInSyncWithUrl = (): void => {
	const router = useRouter();
	const syncSelectedUniversity = useSyncSelectedUniversity();

	useEffect(() => {
		router.events.on(
			NextRouterEvent.ROUTE_CHANGE_START,
			syncSelectedUniversity
		);

		return () => {
			router.events.off(
				NextRouterEvent.ROUTE_CHANGE_START,
				syncSelectedUniversity
			);
		};
	}, [syncSelectedUniversity, router.events]);
};
