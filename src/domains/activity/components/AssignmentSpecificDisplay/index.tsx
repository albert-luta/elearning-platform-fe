import { FC, memo } from 'react';
import {
	AssignmentFieldsFragment,
	BaseActivityFieldsFragment
} from 'generated/graphql';
import { useReactiveVar } from '@apollo/client';
import { selectedUniversityVar } from 'domains/university/reactiveVars';
import { UserRole } from 'domains/shared/constants/UserRole';
import { TeacherAssignmentSpecificDisplay } from './TeacherAssignmentSpecificDisplay';
import { StudentAssignmentSpecificDisplay } from './StudentAssignmentSpecificDisplay';

interface AssignmentSpecificDisplayProps {
	activity: BaseActivityFieldsFragment & AssignmentFieldsFragment;
}

export const AssignmentSpecificDisplay: FC<AssignmentSpecificDisplayProps> = memo(
	function AssignmentSpecificDisplay({ activity }) {
		const university = useReactiveVar(selectedUniversityVar);

		if (university?.role === UserRole.STUDENT) {
			return <StudentAssignmentSpecificDisplay activity={activity} />;
		}

		return <TeacherAssignmentSpecificDisplay activity={activity} />;
	}
);
