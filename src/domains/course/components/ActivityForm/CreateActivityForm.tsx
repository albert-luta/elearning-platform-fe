import { Box, InputLabel, MenuItem, Select } from '@material-ui/core';
import { ActivityType } from 'generated/graphql';
import { ChangeEvent, FC, memo, useCallback, useState } from 'react';
import { CreateAssignmentForm } from './AssignmentForm/CreateAssignmentForm';
import { CreateActivityProps } from './BaseActivityForm';
import { CreateQuizForm } from './QuizForm/CreateQuizForm';
import { CreateResourceForm } from './ResourceForm/CreateResourceForm';

export const CreateActivityForm: FC<CreateActivityProps> = memo(
	function CreateActivityForm({ courseId, sectionId, onSuccess }) {
		const [type, setType] = useState(ActivityType.Resource);
		const changeType = useCallback((e: ChangeEvent<{ value: unknown }>) => {
			setType(e.target.value as ActivityType);
		}, []);

		return (
			<>
				<Box pb={2} display="flex" alignItems="center">
					<Box component="span" mr={2}>
						<InputLabel
							htmlFor="activity-type"
							id="activity-type-label"
						>
							Type
						</InputLabel>
					</Box>
					<Select
						labelId="activity-type-label"
						id="activity-type"
						value={type}
						onChange={changeType}
						style={{ minWidth: 125 }}
					>
						<MenuItem value={ActivityType.Resource}>
							Resource
						</MenuItem>
						<MenuItem value={ActivityType.Assignment}>
							Assignment
						</MenuItem>
						<MenuItem value={ActivityType.Quiz}>Quiz</MenuItem>
					</Select>
				</Box>

				{type === ActivityType.Resource && (
					<CreateResourceForm
						courseId={courseId}
						sectionId={sectionId}
						onSuccess={onSuccess}
					/>
				)}
				{type === ActivityType.Assignment && (
					<CreateAssignmentForm
						courseId={courseId}
						sectionId={sectionId}
						onSuccess={onSuccess}
					/>
				)}
				{type === ActivityType.Quiz && (
					<CreateQuizForm
						courseId={courseId}
						sectionId={sectionId}
						onSuccess={onSuccess}
					/>
				)}
			</>
		);
	}
);
