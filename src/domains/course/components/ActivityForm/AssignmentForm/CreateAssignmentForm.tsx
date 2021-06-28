import { createAssignmentUpdate } from 'domains/course/graphql/updates/createAssignmentUpdate';
import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { useCreateAssignmentMutation } from 'generated/graphql';
import { FC, memo } from 'react';
import { CreateActivityProps } from '../BaseActivityForm';
import { AssignmentForm, CreateAssignmentFormValues } from './AssignmentForm';

export const CreateAssignmentForm: FC<CreateActivityProps> = memo(
	function CreateAssignmentForm({ courseId, sectionId, onSuccess }) {
		const [createAssignment] = useCreateAssignmentMutation({
			update: createAssignmentUpdate(courseId)
		});
		const handleCreateAssignment = useFormikSubmit<CreateAssignmentFormValues>(
			async ({ files, ...data }) => {
				const res = await createAssignment({
					variables: {
						data: {
							sectionId,
							...data
						},
						files: Object.values(files)
					}
				});
				if (!res.data) return;

				onSuccess();
			}
		);

		return (
			<AssignmentForm type="create" onCreate={handleCreateAssignment} />
		);
	}
);
