import { Children, FC, memo, ReactNode } from 'react';
import { isFragment } from 'react-is';
import styled from 'styled-components';

const FieldCss = styled.div``;
const ActionsCss = styled.div``;
const ContainerCss = styled.div<{ spacing: number }>`
	display: flex;
	flex-direction: column;

	& > ${FieldCss}:not(:last-child) {
		padding-bottom: ${({ spacing, theme }) => theme.spacing(spacing)}px;
	}

	& > ${ActionsCss} {
		padding-top: ${({ spacing, theme }) => 2 * theme.spacing(spacing)}px;
	}
`;

interface FormVerticalLayoutProps {
	fields: ReactNode;
	actions?: ReactNode;
	spacing?: number;
}

export const FormVerticalLayout: FC<FormVerticalLayoutProps> = memo(
	function FormVerticalLayout({ fields, actions, spacing = 2 }) {
		return (
			<ContainerCss spacing={spacing}>
				{isFragment(fields) ? (
					Children.map(fields.props.children, (child) => (
						<FieldCss>{child}</FieldCss>
					))
				) : (
					<FieldCss>{fields}</FieldCss>
				)}
				{actions && <ActionsCss>{actions}</ActionsCss>}
			</ContainerCss>
		);
	}
);
