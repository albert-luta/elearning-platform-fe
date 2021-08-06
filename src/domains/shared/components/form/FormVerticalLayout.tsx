import { Children, FC, memo, ReactNode } from 'react';
import { isFragment } from 'react-is';
import styled from 'styled-components';

const Field = styled.div``;
const Actions = styled.div``;
const Container = styled.div<{ spacing: number }>`
	display: flex;
	flex-direction: column;

	& > ${Field}:not(:last-child) {
		padding-bottom: ${({ spacing, theme }) => theme.spacing(spacing)}px;
	}

	& > ${Actions} {
		padding-top: ${({ spacing, theme }) => theme.spacing(2 * spacing)}px;
	}
`;

interface FormVerticalLayoutProps {
	fields: ReactNode;
	actions?: ReactNode;
	spacing?: number;
}

export const FormVerticalLayout: FC<FormVerticalLayoutProps> = memo(
	function FormVerticalLayout({ fields, actions, spacing = 1 }) {
		return (
			<Container spacing={spacing}>
				{isFragment(fields) ? (
					Children.map(fields.props.children, (child) => (
						<Field>{child}</Field>
					))
				) : (
					<Field>{fields}</Field>
				)}
				{actions && <Actions>{actions}</Actions>}
			</Container>
		);
	}
);
