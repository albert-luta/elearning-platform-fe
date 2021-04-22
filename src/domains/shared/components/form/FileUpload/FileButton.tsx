import { Box, Button, Grid, Typography } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import fileSize from 'filesize';
import { FC, memo } from 'react';
import { FileIcon } from '../../FileIcon';

interface FileButtonProps {
	file: File;
	onRemoveFile: (file: File) => void;
}

export const FileButton: FC<FileButtonProps> = memo(function FileButton({
	file,
	onRemoveFile
}) {
	return (
		<Button
			fullWidth
			style={{ textTransform: 'none' }}
			onClick={() => onRemoveFile(file)}
		>
			<Grid container alignItems="center" justify="space-between">
				<Grid item xs={11} container alignItems="center" wrap="nowrap">
					<Box mr={1} display="flex" alignItems="center">
						<FileIcon file={file} />
					</Box>
					<Typography noWrap>
						{file.name}{' '}
						<Typography
							variant="subtitle2"
							component="span"
							color="textSecondary"
						>
							({fileSize(file.size)})
						</Typography>
					</Typography>
				</Grid>
				<Grid
					item
					xs={1}
					container
					justify="flex-end"
					alignItems="center"
				>
					<Clear />
				</Grid>
			</Grid>
		</Button>
	);
});
