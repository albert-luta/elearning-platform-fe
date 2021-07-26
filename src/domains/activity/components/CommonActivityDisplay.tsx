import { FC, memo } from 'react';
import { BaseActivityInterface } from 'generated/graphql';

interface CommonActivityDisplayProps {
	activity: BaseActivityInterface;
}

export const CommonActivityDisplay: FC<CommonActivityDisplayProps> = memo(
	function CommonActivityDisplay() {
		return <></>;
	}
);
