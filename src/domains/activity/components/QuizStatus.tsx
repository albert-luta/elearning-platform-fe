import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@material-ui/core';
import { QuestionIcon } from 'domains/shared/components/icons/QuestionIcon';
import { ListItemCollapsible } from 'domains/shared/components/list/ListItemCollapsible';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import { Countdown } from 'domains/shared/hooks/useCountdown';
import { capitalize } from 'domains/shared/utils/capitalize';
import { formatDuration } from 'domains/shared/utils/formatDuration';
import { QuizQuestionObject } from 'generated/graphql';
import { FC, memo } from 'react';

type QuizStatusProps = {
	maxGrade: number;
	timeOpen: Date;
	timeOpenCountdown: Countdown;
	timeClose: Date;
	timeCloseCountdown: Countdown;
	timeLimit: number;
} & (
	| {
			type: 'student';
			grade?: number | null;
			timeStart: Date | null;
			timeFinish: Date | null;
	  }
	| {
			type: 'teacher';
			shuffleQuestions: boolean;
			shuffleAnswers: boolean;
			quizQuestions: QuizQuestionObject[];
	  }
);

export const QuizStatus: FC<QuizStatusProps> = memo(function QuizStatus(props) {
	const [isQuestionsOpen, , , toggleIsQuestionsOpen] = useBooleanState();

	return (
		<>
			<TableContainer>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>
								{props.type === 'teacher' && 'Max '}Grade
							</TableCell>
							<TableCell>
								{props.type === 'student' &&
									`${props.grade ?? 'Not graded yet'} / `}
								{props.maxGrade}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Time Open</TableCell>
							<TableCell>
								{props.timeOpen.toLocaleString()}{' '}
								{props.timeOpenCountdown.hasCompleted
									? null
									: `- ${formatDuration(
											props.timeOpenCountdown.duration
									  )} remaining`}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Time Close</TableCell>
							<TableCell>
								{props.timeClose.toLocaleString()} -{' '}
								{props.timeCloseCountdown.hasCompleted
									? 'No time'
									: formatDuration(
											props.timeCloseCountdown.duration
									  )}{' '}
								remaining
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Time Limit</TableCell>
							<TableCell>
								{formatDuration(props.timeLimit)}
							</TableCell>
						</TableRow>
						{props.type === 'student' && (
							<>
								<TableRow>
									<TableCell>Time Start</TableCell>
									<TableCell>
										{props.timeStart
											? props.timeStart.toLocaleString()
											: 'Not started yet'}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Time Finish</TableCell>
									<TableCell>
										{props.timeFinish
											? props.timeFinish.toLocaleString()
											: 'Not submitted yet'}
									</TableCell>
								</TableRow>
							</>
						)}
						{props.type === 'teacher' && (
							<>
								<TableRow>
									<TableCell>Shuffle Questions</TableCell>
									<TableCell>
										{capitalize(
											String(props.shuffleQuestions)
										)}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Shuffle Answers</TableCell>
									<TableCell>
										{capitalize(
											String(props.shuffleAnswers)
										)}
									</TableCell>
								</TableRow>
							</>
						)}
					</TableBody>
				</Table>
			</TableContainer>

			{props.type === 'teacher' && (
				<Box mt={2}>
					<ListItemCollapsible
						name="Questions"
						isOpen={isQuestionsOpen}
						onToggle={toggleIsQuestionsOpen}
					>
						{props.quizQuestions.length ? (
							<TableContainer>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell style={{ width: 100 }}>
												Order
											</TableCell>
											<TableCell style={{ width: 125 }}>
												Max Grade
											</TableCell>
											<TableCell style={{ width: 50 }}>
												Type
											</TableCell>
											<TableCell>Name</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{props.quizQuestions.map(
											(
												{
													id,
													maxGrade,
													question: { type, name }
												},
												i
											) => (
												<TableRow key={id}>
													<TableCell>
														{i + 1}
													</TableCell>
													<TableCell>
														{maxGrade}
													</TableCell>
													<TableCell>
														<QuestionIcon
															type={type}
														/>
													</TableCell>
													<TableCell>
														{name}
													</TableCell>
												</TableRow>
											)
										)}
									</TableBody>
								</Table>
							</TableContainer>
						) : (
							<Typography color="textSecondary" align="center">
								There are no questions added
							</Typography>
						)}
					</ListItemCollapsible>
				</Box>
			)}
		</>
	);
});
