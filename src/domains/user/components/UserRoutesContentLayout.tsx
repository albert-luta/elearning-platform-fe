import { Container, Paper } from '@material-ui/core';
import { Content } from 'domains/shared/components/layout/Content';
import { FC, memo } from 'react';

export const UserRoutesContentLayout: FC = memo(
	function UserRoutesContentLayout({ children }) {
		return (
			<Container maxWidth="sm" disableGutters>
				<Paper>
					<Content>{children}</Content>
				</Paper>
			</Container>
		);
	}
);
