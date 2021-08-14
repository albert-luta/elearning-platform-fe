import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	Divider,
	Typography
} from '@material-ui/core';
import { ChatBubble } from '@material-ui/icons';
import { Content } from 'domains/shared/components/layout/Content';
import { ContentHeader } from 'domains/shared/components/layout/ContentHeader';
import { UserRole } from 'domains/shared/constants/UserRole';
import { useBooleanState } from 'domains/shared/hooks/useBooleanState';
import {
	ForumObject,
	UniversityUserFieldsFragment,
	useForumCommentsQuery
} from 'generated/graphql';
import { FC, memo } from 'react';
import { CreateForumCommentForm } from './ForumCommentForm/CreateForumCommentForm';
import { UserActivityReviewInfo } from './UserActivityReviewInfo';

interface ForumSpecificDisplayProps {
	activity: Omit<ForumObject, 'universityUser'> & {
		universityUser: UniversityUserFieldsFragment;
	};
}

export const ForumSpecificDisplay: FC<ForumSpecificDisplayProps> = memo(
	function ForumSpecificDisplay({ activity }) {
		const forumComments = useForumCommentsQuery({
			variables: {
				forumId: activity.id
			}
		});

		const [
			isAddCommentDialogOpen,
			openAddCommentDialog,
			closeAddCommentDialog
		] = useBooleanState();

		if (forumComments.loading) {
			return (
				<Box display="flex" justifyContent="center">
					<CircularProgress />
				</Box>
			);
		}
		if (!forumComments.data) {
			return (
				<Typography color="textSecondary" align="center">
					There was a problem getting the comments, please try again
					later
				</Typography>
			);
		}

		return (
			<>
				<Typography variant="h5">Comments</Typography>
				<Box mt={2}>
					{forumComments.data.forumComments.length ? (
						<>
							{forumComments.data.forumComments.map((comment) => (
								<div key={comment.id}>
									<Box py={1}>
										<UserActivityReviewInfo
											user={comment.universityUser.user}
											role={
												comment.universityUser.role
													.name as UserRole
											}
										/>
										<Box mt={2} pl={7}>
											<Typography>
												{comment.text}
											</Typography>
										</Box>
									</Box>
									<Divider />
								</div>
							))}
							<Box mt={2}>
								<Button
									variant="contained"
									color="primary"
									startIcon={<ChatBubble />}
									onClick={openAddCommentDialog}
								>
									Add Comment
								</Button>
							</Box>

							<Dialog
								open={isAddCommentDialogOpen}
								onClose={closeAddCommentDialog}
								fullWidth
								maxWidth="xs"
							>
								<Content>
									<ContentHeader title="Add Comment" />
									<CreateForumCommentForm
										forumId={activity.id}
										onSuccess={closeAddCommentDialog}
									/>
								</Content>
							</Dialog>
						</>
					) : (
						<Typography color="textSecondary">
							No one commented yet
						</Typography>
					)}
				</Box>
			</>
		);
	}
);
