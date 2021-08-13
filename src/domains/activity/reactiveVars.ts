import { makeVar } from '@apollo/client';

export const quizQuestionIndexVar = makeVar(0);
export const quizQuestionsAnswersVar = makeVar<Record<string, string[]> | null>(
	null
);

export const resetActivityVars = (): void => {
	quizQuestionIndexVar(0);
	quizQuestionsAnswersVar(null);
};
