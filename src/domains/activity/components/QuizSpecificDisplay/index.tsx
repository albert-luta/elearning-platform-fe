import { QuizObject } from 'generated/graphql';
import { UserRole } from 'domains/shared/constants/UserRole';
import { useReactiveVar } from '@apollo/client';
import { selectedUniversityVar } from 'domains/university/reactiveVars';
import { FC, memo } from 'react';
import { StudentQuizSpecificDisplay } from './StudentQuizSpecificDisplay';
import { TeacherQuizSpecificDisplay } from './TeacherQuizSpecificDisplay';

interface QuizSpecificDisplayProps {
	activity: QuizObject;
}

export const QuizSpecificDisplay: FC<QuizSpecificDisplayProps> = memo(
	function QuizSpecificDisplay({ activity }) {
		const university = useReactiveVar(selectedUniversityVar);

		if (university?.role === UserRole.STUDENT) {
			return <StudentQuizSpecificDisplay activity={activity} />;
		}

		return <TeacherQuizSpecificDisplay activity={activity} />;
	}
);
