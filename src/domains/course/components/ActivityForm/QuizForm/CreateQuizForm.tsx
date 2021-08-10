import { createQuizUpdate } from 'domains/course/graphql/updates/createQuizUpdate';
import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { useCreateQuizMutation } from 'generated/graphql';
import { FC, memo } from 'react';
import { CreateActivityProps } from '../BaseActivityForm';
import { CreateQuizFormValues, QuizForm } from './QuizForm';

const MINUTE_MILLISECONDS = 1000 * 60;

export const CreateQuizForm: FC<CreateActivityProps> = memo(
	function CreateQuizForm({ courseId, sectionId, onSuccess }) {
		const [createQuiz] = useCreateQuizMutation({
			update: createQuizUpdate(courseId)
		});
		const handleCreateQuiz = useFormikSubmit<CreateQuizFormValues>(
			async ({ files, timeLimit, questions, ...data }) => {
				const res = await createQuiz({
					variables: {
						data: {
							sectionId,
							...data,
							timeLimit: timeLimit * MINUTE_MILLISECONDS,
							questions: questions.map(({ id, maxGrade }, i) => ({
								maxGrade,
								questionId: id,
								order: i
							}))
						},
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
