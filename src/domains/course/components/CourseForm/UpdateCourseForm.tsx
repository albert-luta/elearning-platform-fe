import { useFormikSubmit } from 'domains/shared/hooks/useFormikSubmit';
import { normalizeUpdateFormInitialValues } from 'domains/shared/utils/form/normalizeUpdateFormInitialValues';
import { CourseObject, useUpdateCourseMutation } from 'generated/graphql';
import { FC, memo } from 'react';
import { CourseForm, UpdateCourseFormValues } from './CourseForm';

interface UpdateCourseFormProps {
	collegeId: string;
	course: CourseObject;
	onSuccess: () => void;
}

export const UpdateCourseForm: FC<UpdateCourseFormProps> = memo(
	function UpdateCourseForm({ collegeId, course, onSuccess }) {
		const [updateCourse] = useUpdateCourseMutation();
		const handleUpdateCourse = useFormikSubmit<UpdateCourseFormValues>(
			async (data) => {
				const res = await updateCourse({
					variables: {
						id: course.id,
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

		return (
			<CourseForm
				type="update"
				initialValues={normalizeUpdateFormInitialValues(course)}
				onUpdate={handleUpdateCourse}
			/>
		);
	}
);
