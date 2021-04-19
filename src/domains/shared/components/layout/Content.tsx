import { Container } from '@material-ui/core';
import { FC, memo } from 'react';
import styled from 'styled-components';

const ContentContainer = styled(Container)`
	overflow-x: hidden;
	padding-top: ${({ theme }) => theme.spacing(2)}px;
	padding-bottom: ${({ theme }) => theme.spacing(2)}px;
`;

export const Content: FC = memo(function Content({ children }) {
	return (
		<ContentContainer>
			<>{children}</>
		</ContentContainer>
	);
});
