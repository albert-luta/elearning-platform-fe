import { Box, Typography } from '@material-ui/core';
import { MyAvatar } from 'domains/shared/components/MyAvatar';
import { UserRole } from 'domains/shared/constants/UserRole';
import { capitalize } from 'domains/shared/utils/capitalize';
import { BaseUserFieldsFragment } from 'generated/graphql';
import { FC, memo } from 'react';

interface UserActivityReviewInfoProps {
	user: BaseUserFieldsFragment;
	role?: UserRole;
}

export const UserActivityReviewInfo: FC<UserActivityReviewInfoProps> = memo(
	function UserActivityReviewInfo({ user, role }) {
		return (
			<Box display="flex" alignItems="center">
				<Box pr={2}>
					<MyAvatar
						src={user.avatar}
						alt={`${user.firstName} ${user.lastName}`}
					/>
				</Box>
				<div>
					<Typography>
						{user.firstName} {user.fatherInitial}. {user.lastName}{' '}
						<Typography component="span" color="textSecondary">
							({user.email})
						</Typography>
					</Typography>
					{role && (
						<Typography color="textSecondary" variant="subtitle1">
							{capitalize(role)}
						</Typography>
					)}
				</div>
			</Box>
		);
	}
);
