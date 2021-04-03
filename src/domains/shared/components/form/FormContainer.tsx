import { Box, Container, ContainerProps } from '@material-ui/core';
import { FC, memo } from 'react';

interface FormContainerProps {
	maxWidth?: ContainerProps['maxWidth'];
}

export const FormContainer: FC<FormContainerProps> = memo(
	function FormContainer({ maxWidth = 'xs', children }) {
		return (
			<Container maxWidth={maxWidth}>
				<Box py={2}>{children}</Box>
			</Container>
		);
	}
);
