import { QuestionCategoryObject } from 'generated/graphql';
import { FC, memo } from 'react';

interface QuestionCategoryCollapsibleProps {
	category: QuestionCategoryObject;
}

export const QuestionCategoryCollapsible: FC<QuestionCategoryCollapsibleProps> = memo(
	function QuestionCategoryCollapsible({ category }) {
		return <>{category.id}</>;
	}
);
