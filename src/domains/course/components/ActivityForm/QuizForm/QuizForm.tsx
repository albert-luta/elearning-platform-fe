import {
	Box,
	Button,
	FormControlLabel,
	Typography,
	Dialog,
	InputLabel,
	IconButton,
	Tooltip
} from '@material-ui/core';
import { Clear, DragHandle } from '@material-ui/icons';
import { QuestionIcon } from 'domains/shared/components/icons/QuestionIcon';
import { ButtonWithLoader } from 'domains/shared/components/buttons/ButtonWithLoader';
import { FormVerticalLayout } from 'domains/shared/components/form/FormVerticalLayout';
import { MyFormik } from 'domains/shared/components/form/MyFormik';
import { Content } from 'domains/shared/components/layout/Content';
import { ContentHeader } from 'domains/shared/components/layout/ContentHeader';
import { FormErrors } from 'domains/shared/constants/FormErrors';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import { FormProps } from 'domains/shared/types/form';
import { Field, FieldArray, Form } from 'formik';
import { Switch, TextField } from 'formik-material-ui';
import { DateTimePicker } from 'formik-material-ui-pickers';
import { QuestionType } from 'generated/graphql';
import { FC, memo } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import * as Yup from 'yup';
import {
	BaseActivityFormFields,
	baseActivityInitialValuesCreate,
	CreateBaseActivityFormValues,
	createBaseActivityValidationSchema,
	UpdateBaseActivityFormValues,
	updateBaseActivityValidationSchema
} from '../BaseActivityForm';
import { QuestionsPicker } from './QuestionsPicker';

export type CreateQuizQuestion = {
	maxGrade: number;
	id: string;
	name: string;
	type: QuestionType;
};
export type CreateQuizFormValues = CreateBaseActivityFormValues & {
	shuffleQuestions: boolean;
	shuffleAnswers: boolean;
	timeOpen: Date;
	timeClose: Date;
	timeLimit: number;
	questions: CreateQuizQuestion[];
};
export type UpdateQuizFormValues = CreateQuizFormValues &
	Omit<UpdateBaseActivityFormValues, keyof CreateQuizFormValues>;

const initialValuesCreate: CreateQuizFormValues = {
	...baseActivityInitialValuesCreate,
	shuffleQuestions: true,
	shuffleAnswers: true,
	timeOpen: new Date(),
	timeClose: new Date(),
	timeLimit: 1,
	questions: []
};

const createAdditions = {
	shuffleQuestions: Yup.boolean().required(FormErrors.REQUIRED),
	shuffleAnswers: Yup.boolean().required(FormErrors.REQUIRED),
	timeOpen: Yup.date()
		.min(
			new Date(),
			({ min }) => FormErrors.MIN_DATE + (min as Date).toLocaleString()
		)
		.required(FormErrors.REQUIRED),
	timeClose: Yup.date()
		.min(
			new Date(),
			({ min }) => FormErrors.MIN_DATE + (min as Date).toLocaleString()
		)
		.required(FormErrors.REQUIRED),
	timeLimit: Yup.number()
		.integer(FormErrors.INTEGER)
		.truncate()
		.min(1, ({ min }) => FormErrors.MIN_NUMBER + min)
		.required(FormErrors.REQUIRED),
	questions: Yup.array()
		.of(
			Yup.object({
				id: Yup.string().trim().required(FormErrors.REQUIRED),
				maxGrade: Yup.number()
					.min(0, ({ min }) => FormErrors.MIN_NUMBER + min)
					.required(FormErrors.REQUIRED)
			}).required(FormErrors.REQUIRED)
		)
		.required(FormErrors.REQUIRED)
};
const createQuizValidationSchema: Yup.SchemaOf<CreateQuizFormValues> = createBaseActivityValidationSchema
	.clone()
	.shape(createAdditions)
	.defined();
const updateQuizValidationSchema: Yup.SchemaOf<UpdateQuizFormValues> = updateBaseActivityValidationSchema
	.clone()
	.shape(createAdditions)
	.defined();

type QuizFormProps = FormProps<CreateQuizFormValues, UpdateQuizFormValues>;

export const QuizForm: FC<QuizFormProps> = memo(function QuizForm(props) {
	const [
		isAddQuestionsDialogOpen,
		openAddQuestionsDialog,
		closeAddQuestionsDialog
	] = useBooleanState();

	return (
		<MyFormik
			{...props}
			initialValuesCreate={initialValuesCreate}
			validationSchemaCreate={createQuizValidationSchema}
			validationSchemaUpdate={updateQuizValidationSchema}
		>
			{({ isSubmitting, values }) => (
				<Form>
					<FormVerticalLayout
						fields={
							<>
								<BaseActivityFormFields />
								<Field
									component={DateTimePicker}
									name="timeOpen"
									label="Time Open"
									ampm={false}
									disablePast
									fullWidth
								/>
								<Field
									component={DateTimePicker}
									name="timeClose"
									label="Time Close"
									ampm={false}
									disablePast
									fullWidth
								/>
								<Field
									component={TextField}
									name="timeLimit"
									label="Time Limit (minutes)"
									type="number"
									fullWidth
								/>
								<FormControlLabel
									control={
										<Field
											component={Switch}
											name="shuffleQuestions"
											type="checkbox"
											color="primary"
										/>
									}
									label="Shuffle Questions"
									labelPlacement="start"
								/>
								<FormControlLabel
									control={
										<Field
											component={Switch}
											name="shuffleAnswers"
											type="checkbox"
											color="primary"
										/>
									}
									label="Shuffle Answers"
									labelPlacement="start"
								/>
								<Box mt={4}>
									<Typography
										variant="h6"
										color="textSecondary"
									>
										Questions
									</Typography>
								</Box>
								<FieldArray
									name="questions"
									render={({ move, remove, push }) => (
										<>
											<DragDropContext
												onDragEnd={({
													destination,
													source
												}) => {
													if (!destination) return;
													if (
														destination.index ===
														source.index
													)
														return;

													move(
														source.index,
														destination.index
													);
												}}
											>
												<Droppable droppableId="question-list">
													{(providedDroppable) => (
														<div
															ref={
																providedDroppable.innerRef
															}
															{...providedDroppable.droppableProps}
														>
															{values.questions.map(
																(
																	question,
																	i
																) => (
																	<Draggable
																		key={
																			question.id
																		}
																		draggableId={
																			question.id
																		}
																		index={
																			i
																		}
																	>
																		{(
																			providedDraggable
																		) => (
																			<div
																				ref={
																					providedDraggable.innerRef
																				}
																				{...providedDraggable.draggableProps}
																				style={{
																					marginTop: 16,
																					...providedDraggable
																						.draggableProps
																						.style
																				}}
																			>
																				<Box
																					display="flex"
																					alignItems="center"
																				>
																					<Box
																						display="flex"
																						justifyContent="center"
																						alignItems="center"
																						{...providedDraggable.dragHandleProps}
																						style={{
																							padding:
																								'12px 12px 12px 0'
																						}}
																					>
																						<DragHandle fontSize="small" />
																					</Box>
																					<InputLabel>
																						Question{' '}
																						{i +
																							1}
																					</InputLabel>
																					<Tooltip title="Delete question">
																						<IconButton
																							onClick={() =>
																								remove(
																									i
																								)
																							}
																						>
																							<Clear fontSize="small" />
																						</IconButton>
																					</Tooltip>
																				</Box>
																				<Box
																					mt={
																						1
																					}
																					width="100%"
																					display="flex"
																					alignItems="center"
																					justifyContent="space-between"
																				>
																					<Box
																						display="flex"
																						alignItems="center"
																						flex={
																							1
																						}
																					>
																						<Box
																							pr={
																								1.5
																							}
																							display="flex"
																							alignItems="center"
																						>
																							<QuestionIcon
																								type={
																									question.type
																								}
																							/>
																						</Box>
																						<Typography>
																							{
																								question.name
																							}
																						</Typography>
																					</Box>
																					<Field
																						component={
																							TextField
																						}
																						name={`questions[${i}].maxGrade`}
																						label="Max Grade"
																						type="number"
																					/>
																				</Box>
																			</div>
																		)}
																	</Draggable>
																)
															)}
															{
																providedDroppable.placeholder
															}
														</div>
													)}
												</Droppable>
											</DragDropContext>

											<Dialog
												open={isAddQuestionsDialogOpen}
												onClose={
													closeAddQuestionsDialog
												}
												fullWidth
												maxWidth="md"
											>
												<Content>
													<ContentHeader title="Questions" />
													<QuestionsPicker
														picked={
															values.questions
														}
														onPick={(
															newQuestions
														) => {
															newQuestions.forEach(
																push
															);
															closeAddQuestionsDialog();
														}}
													/>
												</Content>
											</Dialog>
										</>
									)}
								/>
								<Box mt={2}>
									<Button
										fullWidth
										onClick={openAddQuestionsDialog}
									>
										+ Add questions
									</Button>
								</Box>
							</>
						}
						actions={
							<ButtonWithLoader
								variant="contained"
								color="primary"
								fullWidth
								loading={isSubmitting}
								type="submit"
							>
								{props.type === 'create' ? 'Create' : 'Update'}
							</ButtonWithLoader>
						}
					/>
				</Form>
			)}
		</MyFormik>
	);
});
