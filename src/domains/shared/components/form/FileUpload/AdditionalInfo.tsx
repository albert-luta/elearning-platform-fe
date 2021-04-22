import { Grid, Typography } from '@material-ui/core';
import { FC, memo } from 'react';
import { FileUploadProps } from '.';

type AdditionalInfoProps = Pick<
	FileUploadProps,
	'maxFiles' | 'maxFileSize' | 'maxFileSizeUnit'
> & {
	filesArray: File[];
	acceptedFileExtensionsArray?: string[];
};

export const AdditionalInfo: FC<AdditionalInfoProps> = memo(
	function AdditionalInfo({
		maxFiles,
		maxFileSize,
		maxFileSizeUnit,
		filesArray,
		acceptedFileExtensionsArray
	}) {
		if (
			maxFiles == null &&
			maxFileSize == null &&
			acceptedFileExtensionsArray == null
		) {
			return null;
		}

		return (
			<Grid container justify="space-between" alignItems="flex-end">
				<Grid item>
					{maxFiles && (
						<Typography color="textSecondary" variant="subtitle2">
							Files: {filesArray.length}/{maxFiles}
						</Typography>
					)}
					{acceptedFileExtensionsArray && (
						<Typography color="textSecondary" variant="subtitle2">
							Accepted file extensions:{' '}
							{acceptedFileExtensionsArray.join(', ')}
						</Typography>
					)}
				</Grid>
				<Grid item>
					{maxFileSize && (
						<Typography color="textSecondary" variant="subtitle2">
							Maximum file size: {maxFileSize} {maxFileSizeUnit}
						</Typography>
					)}
				</Grid>
			</Grid>
		);
	}
);
