import { MyFormik } from 'domains/shared/components/form/MyFormik';
import { FormErrors } from 'domains/shared/constants/FormErrors';
import { FormProps } from 'domains/shared/types/form';
import { Field, FieldArray, Form } from 'formik';
import { Select, TextField } from 'formik-material-ui';
import { QuestionType } from 'generated/graphql';
import { FC, memo } from 'react';
import * as Yup from 'yup';
import { ButtonWithLoader } from 'domains/shared/components/buttons/ButtonWithLoader';
import {
	Box,
	Button,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Tooltip,
	Typography
} from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp, Clear } from '@material-ui/icons';
import { AnswersTips } from './AnswersTips';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';

export interface CreateQuestionFormValues {
	name: string;
	text: string;
	type: string;
	answers: { text: string; fraction: number }[];
}
export type UpdateQuestionFormValues = CreateQuestionFormValues;

const initialValuesCreate: CreateQuestionFormValues = {
	name: '',
	text: '',
	type: QuestionType.SingleChoice,
	answers: []
};

const createQuestionValidationSchema: Yup.SchemaOf<CreateQuestionFormValues> = Yup.object(
	{
		name: Yup.string().trim().required(FormErrors.REQUIRED),
		text: Yup.string().trim().required(FormErrors.REQUIRED),
		type: Yup.string()
			.oneOf(Object.values(QuestionType))
			.required(FormErrors.REQUIRED),
		answers: Yup.array()
			.of(
				Yup.object({
					text: Yup.string().trim().required(FormErrors.REQUIRED),
					fraction: Yup.number()
						.min(-100, ({ min }) => FormErrors.MIN_NUMBER + min)
						.max(100, ({ max }) => FormErrors.MAX_NUMBER + max)
						.required(FormErrors.REQUIRED)
				}).required(FormErrors.REQUIRED)
			)
			.required(FormErrors.REQUIRED)
	}
);
const updateQuestionValidationSchema: Yup.SchemaOf<UpdateQuestionFormValues> = createQuestionValidationSchema.clone();

type QuestionFormProps = FormProps<
	CreateQuestionFormValues,
	UpdateQuestionFormValues
>;

export const QuestionForm: FC<QuestionFormProps> = memo(function QuestionForm(
	props
) {
	const [shouldShowAnswerTips, , , toggleAnswerTips] = useBooleanState();

	return (
		<MyFormik
			{...props}
			initialValuesCreate={initialValuesCreate}
			validationSchemaCreate={createQuestionValidationSchema}
			validationSchemaUpdate={updateQuestionValidationSchema}
		>
			{({ isSubmitting, values }) => (
				<Form>
					<FormControl>
						<InputLabel htmlFor="type">Type</InputLabel>
						<Field
							component={Select}
							name="type"
							inputProps={{ id: 'type' }}
						>
							<MenuItem value={QuestionType.SingleChoice}>
								Single choice
							</MenuItem>
							<MenuItem value={QuestionType.MultipleChoice}>
								Multiple choice
							</MenuItem>
						</Field>
					</FormControl>
					<Box mt={1}>
						<Field
							component={TextField}
							name="name"
							label="Name"
							fullWidth
						/>
					</Box>
					<Box mt={1}>
						<Field
							component={TextField}
							name="text"
							label="Text"
							fullWidth
							multiline
						/>
					</Box>
					<Box mt={4}>
						<Box display="flex" alignItems="center">
							<Typography variant="h6" color="textSecondary">
								Answers
							</Typography>
							<IconButton onClick={toggleAnswerTips}>
								{shouldShowAnswerTips ? (
									<Tooltip title="Close tips">
										<ArrowDropUp fontSize="small" />
									</Tooltip>
								) : (
									<Tooltip title="Open tips">
										<ArrowDropDown fontSize="small" />
									</Tooltip>
								)}
							</IconButton>
						</Box>
						<AnswersTips show={shouldShowAnswerTips} />
					</Box>
					<FieldArray
						name="answers"
						render={({ remove, push }) => (
							<>
								{values.answers.map((_, i) => (
									<Box key={i} mt={2}>
										<Box display="flex" alignItems="center">
											<InputLabel>
												Answer {i + 1}
											</InputLabel>
											<Tooltip title="Delete answer">
												<IconButton
													onClick={() => remove(i)}
												>
													<Clear fontSize="small" />
												</IconButton>
											</Tooltip>
										</Box>
										<Box mt={1}>
											<Field
												component={TextField}
												name={`answers[${i}].text`}
												label="Text"
												fullWidth
												multiline
											/>
										</Box>
										<Box mt={1}>
											<Field
												component={TextField}
												name={`answers[${i}].fraction`}
												label="Fraction"
												type="number"
												fullWidth
											/>
										</Box>
									</Box>
								))}
								<Box mt={2}>
									<Button
										fullWidth
										onClick={() =>
											push({ text: '', fraction: '' })
										}
									>
										+ Add answer
									</Button>
								</Box>
							</>
						)}
					/>
					<Box mt={3}>
						<ButtonWithLoader
							variant="contained"
							color="primary"
							fullWidth
							loading={isSubmitting}
							type="submit"
						>
							{props.type === 'create' ? 'Create' : 'Update'}
						</ButtonWithLoader>
					</Box>
				</Form>
			)}
		</MyFormik>
	);
});
