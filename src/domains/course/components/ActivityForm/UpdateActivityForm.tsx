import { BaseActivityInterface } from 'generated/graphql';
import { FC, memo } from 'react';

interface UpdateActivityFormProps {
	activity: BaseActivityInterface;
	onSuccess: () => void;
}

export const UpdateActivityForm: FC<UpdateActivityFormProps> = memo(
	function UpdateActivityForm({ activity, onSuccess }) {
		return (
			<>
				<div onClick={onSuccess}>{activity.name}</div>
			</>
		);
	}
);
