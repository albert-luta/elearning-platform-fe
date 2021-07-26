import { FC, memo } from 'react';
import { AssignmentObject } from 'generated/graphql';

interface AssignmentSpecificDisplayProps {
	activity: AssignmentObject;
}

export const AssignmentSpecificDisplay: FC<AssignmentSpecificDisplayProps> = memo(
	function AssignmentSpecificDisplay() {
		return <></>;
	}
);
