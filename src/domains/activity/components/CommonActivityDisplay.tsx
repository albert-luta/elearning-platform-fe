import { FC, memo } from 'react';
import { Box, Typography } from '@material-ui/core';
import { FileButton } from 'domains/shared/components/buttons/FileButton';
import { ContentHeader } from 'domains/shared/components/layout/ContentHeader';
import { BaseActivityInterface } from 'generated/graphql';

interface CommonActivityDisplayProps {
	activity: BaseActivityInterface;
}

export const CommonActivityDisplay: FC<CommonActivityDisplayProps> = memo(
	function CommonActivityDisplay({ activity }) {
		return (
			<>
				<ContentHeader title={activity.name} />
				{activity.description && (
					<Typography>{activity.description}</Typography>
				)}
				{!!activity.files.length && (
					<Box mt={2}>
						{activity.files.map((file, i) => (
							<Box
								key={file + i}
								mb={i !== activity.files.length - 1 ? 1 : 0}
							>
								<FileButton file={file} download />
							</Box>
						))}
					</Box>
				)}
			</>
		);
	}
);
