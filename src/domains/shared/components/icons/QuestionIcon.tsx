import { RadioButtonChecked, CheckBox } from '@material-ui/icons';
import { QuestionType } from 'generated/graphql';
import { FC, memo } from 'react';

interface QuestionIconProps {
	type: QuestionType;
}

export const QuestionIcon: FC<QuestionIconProps> = memo(function QuestionIcon({
	type
}) {
	if (type === QuestionType.SingleChoice) {
		return <RadioButtonChecked />;
	}

	return <CheckBox />;
});
