import { Box, List, Typography } from '@material-ui/core';
import { CollegeDrawerCollapsible } from 'domains/college/components/CollegeDrawerCollapsible';
import { useCollegesQuery } from 'generated/graphql';
import { FC, memo } from 'react';
import { MySkeleton } from '../../MySkeleton';

interface DrawerContentProps {
	onClose?: () => void;
}

export const DrawerContent: FC<DrawerContentProps> = memo(
	function DrawerContent({ onClose }) {
		const colleges = useCollegesQuery();

		if (colleges.loading) {
			return (
				<List>
					<Box px={2}>
						{Array(5)
							.fill(0)
							.map((_, i) => (
								<Box key={i} pt={i && 1}>
									<MySkeleton variant="round" height={50} />
								</Box>
							))}
					</Box>
				</List>
			);
		}

		if (!colleges.data?.colleges.length) {
			return (
				<List>
					<Box px={2}>
						<Typography color="textSecondary" align="center">
							There are no colleges created yet
						</Typography>
					</Box>
				</List>
			);
		}

		return (
			<Box flex={1} overflow="auto">
				<List component="nav">
					{colleges.data.colleges.map((college) => (
						<CollegeDrawerCollapsible
							key={college.id}
							college={college}
							onClose={onClose}
						/>
					))}
				</List>
			</Box>
		);
	}
);
