import { Container, ContainerProps } from '@material-ui/core';
import { FC, memo, ReactNode } from 'react';
import styled from 'styled-components';

const ContentContainer = styled(Container)`
	overflow-x: hidden;
	padding-top: ${({ theme }) => theme.spacing(2)}px;
	padding-bottom: ${({ theme }) => theme.spacing(2)}px;
`;

type ContentProps = Omit<ContainerProps, 'children'> & {
	children: ReactNode;
};

export const Content: FC<ContentProps> = memo(function Content({ children }) {
	return (
		<ContentContainer>
			<>{children}</>
		</ContentContainer>
	);
});
