import { FC, memo } from 'react';
import { Box, Typography } from '@material-ui/core';
import { FileButton } from 'domains/shared/components/buttons/FileButton';
import { ContentHeader } from 'domains/shared/components/layout/ContentHeader';
import { BaseActivityFieldsFragment } from 'generated/graphql';

interface CommonActivityDisplayProps {
	activity: BaseActivityFieldsFragment;
}

export const CommonActivityDisplay: FC<CommonActivityDisplayProps> = memo(
	function CommonActivityDisplay({ activity }) {
		return (
			<>
				<ContentHeader
					title={activity.name}
					disableGutters={
						!activity.description || !!activity.files.length
					}
				/>
				{activity.description && (
					<Box mt={2}>
						<Typography>{activity.description}</Typography>
					</Box>
				)}
				{!!activity.files.length && (
					<Box mt={2}>
						{activity.files.map((file, i) => (
							<Box
								key={file}
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
