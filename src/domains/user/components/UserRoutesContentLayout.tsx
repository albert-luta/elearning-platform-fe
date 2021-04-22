import { Container } from '@material-ui/core';
import { FC, memo } from 'react';

export const UserRoutesContentLayout: FC = memo(
	function UserRoutesContentLayout({ children }) {
		return (
			<Container maxWidth="sm" disableGutters>
				<>{children}</>
			</Container>
		);
	}
);
