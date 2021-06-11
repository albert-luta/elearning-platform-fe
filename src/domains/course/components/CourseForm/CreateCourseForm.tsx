import { createCourseUpdate } from 'domains/course/graphql/updates/createCourseUpdate';
import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { useCreateCourseMutation } from 'generated/graphql';
import { FC, memo } from 'react';
import { CourseForm, CreateCourseFormValues } from './CourseForm';

interface CreateCourseFormProps {
	collegeId: string;
	onSuccess: () => void;
}

export const CreateCourseForm: FC<CreateCourseFormProps> = memo(
	function CreateCourseForm({ collegeId, onSuccess }) {
		const [createCourse] = useCreateCourseMutation({
			update: createCourseUpdate
		});
		const handleCreateCourse = useFormikSubmit<CreateCourseFormValues>(
			async (data) => {
				const res = await createCourse({
					variables: {
						data: {
							collegeId,
							...data
						}
					}
				});
				if (!res.data) return;

				onSuccess();
			}
		);

		return <CourseForm type="create" onCreate={handleCreateCourse} />;
	}
);
