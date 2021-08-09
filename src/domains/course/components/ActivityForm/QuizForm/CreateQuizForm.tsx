import { createQuizUpdate } from 'domains/course/graphql/updates/createQuizUpdate';
import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { useCreateQuizMutation } from 'generated/graphql';
import { FC, memo } from 'react';
import { CreateActivityProps } from '../BaseActivityForm';
import { CreateQuizFormValues, QuizForm } from './QuizForm';

export const CreateQuizForm: FC<CreateActivityProps> = memo(
	function CreateQuizForm({ courseId, sectionId, onSuccess }) {
		const [createQuiz] = useCreateQuizMutation({
			update: createQuizUpdate(courseId)
		});
		const handleCreateQuiz = useFormikSubmit<CreateQuizFormValues>(
			async ({ files, ...data }) => {
				const res = await createQuiz({
					variables: {
						data: {
							sectionId,
							...data
						} as any,
						// TODO: send the correct create quiz data
						files: Object.values(files)
					}
				});
				if (!res.data) return;

				onSuccess();
			}
		);

		return <QuizForm type="create" onCreate={handleCreateQuiz} />;
	}
);
