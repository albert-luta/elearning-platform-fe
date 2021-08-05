import { Box, Typography, TypographyProps } from '@material-ui/core';
import { FC, memo, ReactNode } from 'react';

interface ContentHeaderProps {
	title: string;
	action?: ReactNode;
	align?: TypographyProps['align'];
	disableGutters?: boolean;
}

export const ContentHeader: FC<ContentHeaderProps> = memo(
	function ContentHeader({ title, action, align, disableGutters = false }) {
		return (
			<Box mb={disableGutters ? 0 : 2} display="flex" alignItems="center">
				<Typography variant="h4" align={align}>
					{title}
				</Typography>
				{action && <Box ml={1}>{action}</Box>}
			</Box>
		);
	}
);
