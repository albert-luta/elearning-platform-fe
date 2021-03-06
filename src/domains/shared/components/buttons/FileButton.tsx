import { Box, Button, Grid, Link, Typography } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { getFileNameFromUrl } from 'domains/shared/utils/file/getFileNameFromUrl';
import fileSize from 'filesize';
import { FC } from 'react';
import { FileIcon } from '../icons/FileIcon';

const Content: FC<{ file: File | string; download?: boolean }> = ({
	file,
	download = false
}) => {
	const name =
		file instanceof File ? file.name : getFileNameFromUrl(file as string);
	const size = file instanceof File ? file.size : undefined;

	return (
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
			{!download && (
				<Grid
					item
					xs={1}
					container
					justify="flex-end"
					alignItems="center"
				>
					<Clear />
				</Grid>
			)}
		</Grid>
	);
};

type FileButtonProps<TFile extends File | string> =
	| {
			file: TFile;
			onRemoveFile: (file: TFile) => void;
			download?: false;
	  }
	| { file: string; download: true };

export function FileButton<TFile extends File | string>(
	props: FileButtonProps<TFile>
) {
	return props.download ? (
		<Link href={props.file} color="inherit" download>
			<Content file={props.file} download />
		</Link>
	) : (
		<Button
			fullWidth
			style={{ textTransform: 'none' }}
			onClick={() => props.onRemoveFile(props.file)}
		>
			<Content file={props.file} />
		</Button>
	);
}
