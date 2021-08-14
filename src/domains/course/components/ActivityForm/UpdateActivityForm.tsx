import { ActivityType } from 'generated/graphql';
import { FC, memo } from 'react';
import { UpdateAssignmentForm } from './AssignmentForm/UpdateAssignmentForm';
import { UpdateActivityProps } from './BaseActivityForm';
import { UpdateForumForm } from './ForumForm/UpdateForumForm';
import { UpdateQuizForm } from './QuizForm/UpdateQuizForm';
import { UpdateResourceForm } from './ResourceForm/UpdateResourceForm';

export const UpdateActivityForm: FC<UpdateActivityProps> = memo(
	function UpdateActivityForm({ activity, onSuccess }) {
		if (activity.type === ActivityType.Resource) {
			return (
				<UpdateResourceForm activity={activity} onSuccess={onSuccess} />
			);
		}

		if (activity.type === ActivityType.Assignment) {
			return (
				<UpdateAssignmentForm
					activity={activity}
					onSuccess={onSuccess}
				/>
			);
		}

		if (activity.type === ActivityType.Quiz) {
			return <UpdateQuizForm activity={activity} onSuccess={onSuccess} />;
		}

		return <UpdateForumForm activity={activity} onSuccess={onSuccess} />;
	}
);
