import { FC, forwardRef, memo, useCallback } from 'react';
import { Routes } from 'domains/shared/constants/Routes';
import { useMeQuery } from 'generated/graphql';
import { Skeleton } from '@material-ui/lab';
import { ButtonLink, ButtonLinkProps } from '../../buttons/ButtonLink';
import { AccountImgContainer } from './index.styles';
import { Hidden, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { useRefreshTokens } from 'domains/auth/hooks/useRefreshTokens';
import Image from 'next/image';

type UserButtonProps = Partial<ButtonLinkProps>;

export const UserButton: FC<UserButtonProps> = memo(
	forwardRef<HTMLAnchorElement, UserButtonProps>(({ ...props }, ref) => {
		const me = useMeQuery();
		const refreshTokens = useRefreshTokens();
		const refetchMe = useCallback(() => {
			me.refetch();
			refreshTokens();
		}, [me, refreshTokens]);

		return (
			<ButtonLink
				{...props}
				href={Routes.user.DASHBOARD.path}
				style={{ textTransform: 'none' }}
				onClick={refetchMe}
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
				<AccountImgContainer>
					{me.loading ? (
						<Skeleton
							variant="circle"
							width="2.1875rem"
							height="2.1875rem"
						/>
					) : me.data?.me.avatar ? (
						<Image
							src={me.data?.me.avatar}
							alt="User Avatar"
							layout="fill"
							objectFit="contain"
						/>
					) : (
						<AccountCircle fontSize="large" />
					)}
				</AccountImgContainer>
			</ButtonLink>
		);
	})
);
UserButton.displayName = 'UserButton';
