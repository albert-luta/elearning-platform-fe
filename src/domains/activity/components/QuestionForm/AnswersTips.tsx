import { FC, memo } from 'react';
import { Collapse, Typography } from '@material-ui/core';

interface AnswersTipsProps {
	show: boolean;
}

export const AnswersTips: FC<AnswersTipsProps> = memo(function AnswersTips({
	show
}) {
	return (
		<Collapse in={show}>
			<Typography color="textSecondary">
				To calculate the grade properly make sure:
			</Typography>
			<ul>
				<li>
					<Typography color="textSecondary">
						fraction take values between -100 and 100
					</Typography>
				</li>
				<li>
					<Typography color="textSecondary">
						for single choice, only 1 answer must have fraction =
						100, the rest must have = 0
					</Typography>
				</li>
				<li>
					<Typography color="textSecondary">
						for multiple choice, the sum of all positive fractions
						must = 100
					</Typography>
				</li>
				<li>
					<Typography color="textSecondary">
						for multiple choice, the sum of all negative fractions
						must = -100
					</Typography>
				</li>
			</ul>
		</Collapse>
	);
});
