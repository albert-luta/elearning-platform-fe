import { Box, Grid, Typography } from '@material-ui/core';
import { FC, memo, ReactNode } from 'react';

interface ContentHeaderProps {
	title: string;
	action?: ReactNode;
}

export const ContentHeader: FC<ContentHeaderProps> = memo(
	function ContentHeader({ title, action }) {
		return (
			<Box mb={2}>
				<Grid container alignItems="center">
					<Grid item xs>
						<Typography variant="h4">{title}</Typography>
					</Grid>
					{action && <Grid item>{action}</Grid>}
				</Grid>
			</Box>
		);
	}
);
