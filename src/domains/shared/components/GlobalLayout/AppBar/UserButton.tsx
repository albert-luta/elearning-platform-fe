import { FC, forwardRef, memo, useCallback } from 'react';
import { Routes } from 'domains/shared/constants/Routes';
import { useMeQuery } from 'generated/graphql';
import { Skeleton } from '@material-ui/lab';
import { ButtonLink, ButtonLinkProps } from '../../buttons/ButtonLink';
import { Box, Hidden, Typography } from '@material-ui/core';
import { useRefreshTokens } from 'domains/auth/hooks/useRefreshTokens';
import { MyAvatar } from '../../MyAvatar';

type UserButtonProps = Partial<ButtonLinkProps>;

export const UserButton: FC<UserButtonProps> = memo(
	forwardRef<HTMLAnchorElement, UserButtonProps>(({ ...props }, ref) => {
		const me = useMeQuery();
		const refreshTokens = useRefreshTokens();
		const refresh = useCallback((): void => {
			refreshTokens();
			me.refetch();
		}, [refreshTokens, me]);

		return (
			<ButtonLink
				{...props}
				href={Routes.user.DASHBOARD.path}
				style={{ textTransform: 'none' }}
				onClick={refresh}
				disabled={me.loading}
				ref={ref}
			>
				<Hidden xsDown>
					{me.loading ? (
						<Skeleton width={90} />
					) : (
						<Typography>
							{me.data?.me.firstName} {me.data?.me.fatherInitial}.{' '}
							{me.data?.me.lastName}
						</Typography>
					)}
				</Hidden>
				<Box ml={1.5}>
					{me.loading ? (
						<Skeleton
							variant="circle"
							width="2.1875rem"
							height="2.1875rem"
						/>
					) : me.data ? (
						<MyAvatar
							src={me.data.me.avatar}
							alt={`${me.data.me.firstName} ${me.data.me.lastName}`}
						/>
					) : null}
				</Box>
			</ButtonLink>
		);
	})
);
UserButton.displayName = 'UserButton';
