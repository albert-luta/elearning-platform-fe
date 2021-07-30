import { AssignmentObject } from 'generated/graphql';
import { FC, memo } from 'react';

interface TeacherAssignmentSpecificDisplayProps {
	activity: AssignmentObject;
}

export const TeacherAssignmentSpecificDisplay: FC<TeacherAssignmentSpecificDisplayProps> = memo(
	function TeacherAssignmentSpecificDisplay() {
		return <>teacher</>;
	}
);
