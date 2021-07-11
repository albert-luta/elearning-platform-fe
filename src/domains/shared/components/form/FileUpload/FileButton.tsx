import { Box, Button, Grid, Typography } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { getFileNameFromUrl } from 'domains/shared/utils/file/getFileNameFromUrl';
import fileSize from 'filesize';
import { FileIcon } from '../../FileIcon';

interface FileButtonProps<TFile extends File | string> {
	file: TFile;
	onRemoveFile: (file: TFile) => void;
}

export function FileButton<TFile extends File | string>({
	file,
	onRemoveFile
}: FileButtonProps<TFile>) {
	const name =
		file instanceof File ? file.name : getFileNameFromUrl(file as string);
	const size = file instanceof File ? file.size : undefined;

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
						{name}{' '}
						<Typography
							variant="subtitle2"
							component="span"
							color="textSecondary"
						>
							{size != null && `(${fileSize(size)})`}
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
}
