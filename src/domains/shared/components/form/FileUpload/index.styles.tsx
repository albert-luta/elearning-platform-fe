import styled, { css } from 'styled-components';

const hoverOrDraggingOverMixin = css`
	outline-color: ${({ theme }) => theme.palette.grey[300]};
`;
export const DragAndDropContainer = styled.div<{ isDraggingOver: boolean }>`
	height: 130px;
	padding: ${({ theme }) => theme.spacing(2)}px;
	background-color: ${({ theme }) => theme.palette.grey[900]};
	border-radius: ${({ theme }) => theme.shape.borderRadius}px;
	outline: 2px dashed ${({ theme }) => theme.palette.grey[800]};
	outline-offset: ${({ theme }) => theme.spacing(-1)}px;
	cursor: pointer;
	transition: ${({ theme }) =>
		theme.transitions.create('outline-color', {
			duration: theme.transitions.duration.shortest
		})};

	&:hover {
		${hoverOrDraggingOverMixin}
	}

	& > * {
		pointer-events: none;
		user-select: none;
	}

	${({ isDraggingOver }) => isDraggingOver && hoverOrDraggingOverMixin};
`;
