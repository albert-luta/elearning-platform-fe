import { QuizObject } from 'generated/graphql';
import { FC, memo } from 'react';

interface QuizSpecificDisplayProps {
	activity: QuizObject;
}

export const QuizSpecificDisplay: FC<QuizSpecificDisplayProps> = memo(
	function QuizSpecificDisplay() {
		return <></>;
	}
);
