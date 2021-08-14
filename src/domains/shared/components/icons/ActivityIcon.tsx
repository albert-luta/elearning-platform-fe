import { Assessment, Assignment, Folder, Forum } from '@material-ui/icons';
import { ActivityType } from 'generated/graphql';
import { FC, memo } from 'react';

interface ActivityIconProps {
	type: string;
}

export const ActivityIcon: FC<ActivityIconProps> = memo(function ActivityIcon({
	type
}) {
	if (type === ActivityType.Resource) {
		return <Folder />;
	}

	if (type === ActivityType.Assignment) {
		return <Assignment />;
	}

	if (type === ActivityType.Quiz) {
		return <Assessment />;
	}

	return <Forum />;
});
