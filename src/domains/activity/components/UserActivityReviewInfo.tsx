/* import { Box, Typography } from '@material-ui/core'; */
/* import { MyAvatar } from 'domains/shared/components/MyAvatar'; */
import { Box, Typography } from '@material-ui/core';
import { MyAvatar } from 'domains/shared/components/MyAvatar';
import { BaseUserFieldsFragment } from 'generated/graphql';
import { FC, memo } from 'react';

interface UserActivityReviewInfoProps {
	user: BaseUserFieldsFragment;
}

export const UserActivityReviewInfo: FC<UserActivityReviewInfoProps> = memo(
	function UserActivityReviewInfo({ user }) {
		return (
			<Box display="flex" alignItems="center">
				<Box pr={2}>
					<MyAvatar
						src={user.avatar}
						alt={`${user.firstName} ${user.lastName}`}
					/>
				</Box>
				<Typography>
					{user.firstName} {user.fatherInitial}. {user.lastName}{' '}
					<Typography component="span" color="textSecondary">
						({user.email})
					</Typography>
				</Typography>
			</Box>
		);
	}
);
