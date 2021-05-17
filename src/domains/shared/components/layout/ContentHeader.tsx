import { Box, Grid, Typography, TypographyProps } from '@material-ui/core';
import { FC, memo, ReactNode } from 'react';

interface ContentHeaderProps {
	title: string;
	action?: ReactNode;
	align?: TypographyProps['align'];
}

export const ContentHeader: FC<ContentHeaderProps> = memo(
	function ContentHeader({ title, action, align }) {
		return (
			<Box mb={2}>
				<Grid container alignItems="center">
					<Grid item xs>
						<Typography variant="h4" align={align}>
							{title}
						</Typography>
					</Grid>
					{action && <Grid item>{action}</Grid>}
				</Grid>
			</Box>
		);
	}
);
