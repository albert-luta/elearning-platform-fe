import { FC, forwardRef, memo, useCallback } from 'react';
import { Routes } from 'domains/shared/constants/Routes';
import { useCollegesQuery, useMeQuery } from 'generated/graphql';
import { Skeleton } from '@material-ui/lab';
import { ButtonLink, ButtonLinkProps } from '../../buttons/ButtonLink';
import { Box, Hidden, Typography } from '@material-ui/core';
import { useRefreshTokens } from 'domains/auth/hooks/useRefreshTokens';
import { MyAvatar } from '../../MyAvatar';
import { useReactiveVar } from '@apollo/client';
import { selectedUniversityVar } from 'domains/university/reactiveVars';
import { composeDynamicRoute } from 'domains/shared/utils/route/composeDynamicRoute';

type UniversityButtonProps = Partial<ButtonLinkProps>;

export const UniversityButton: FC<UniversityButtonProps> = memo(
	forwardRef<HTMLAnchorElement, UniversityButtonProps>(
		({ ...props }, ref) => {
			const refreshTokens = useRefreshTokens();
			const me = useMeQuery();
			const colleges = useCollegesQuery();
			const refresh = useCallback((): void => {
				refreshTokens();
				me.refetch();
				colleges.refetch();
			}, [refreshTokens, me, colleges]);

			const university = useReactiveVar(selectedUniversityVar);
			const href = university
				? composeDynamicRoute(Routes.university.DASHBOARD.path, {
						universityId: university.id
				  })
				: Routes.user.DASHBOARD.path;

			return (
				<ButtonLink
					{...props}
					href={href}
					style={{ textTransform: 'none' }}
					onClick={refresh}
					disabled={me.loading}
					ref={ref}
				>
					<Box mr={1.5}>
						{me.loading ? (
							<Skeleton
								variant="circle"
								width="2.1875rem"
								height="2.1875rem"
							/>
						) : university ? (
							<MyAvatar
								src={university.logo}
								alt={university.name}
							/>
						) : null}
					</Box>
					<Hidden xsDown>
						{me.loading ? (
							<Skeleton width={90} />
						) : (
							<Typography>{university?.name}</Typography>
						)}
					</Hidden>
				</ButtonLink>
			);
		}
	)
);
UniversityButton.displayName = 'UniversityButton';
