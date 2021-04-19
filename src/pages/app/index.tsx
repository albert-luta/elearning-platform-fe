import { Box, IconButton, Tooltip } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { ContentHeader } from 'domains/shared/components/layout/ContentHeader';
import { MySkeleton } from 'domains/shared/components/MySkeleton';
import { Routes } from 'domains/shared/constants/Routes';
import { UniversitiesCards } from 'domains/user/components/UniversitiesCards';
import { useMeQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import { Fragment, useCallback } from 'react';

export default function App() {
	const me = useMeQuery();

	const router = useRouter();
	const redirectToCreateUniversity = useCallback(() => {
		router.push(Routes.user.CREATE_UNIVERSITY);
	}, [router]);

	return (
		<>
			<ContentHeader
				title="Universities"
				action={
					<Tooltip title="Create University">
						<IconButton onClick={redirectToCreateUniversity}>
							<Add />
						</IconButton>
					</Tooltip>
				}
			/>

			{me.loading ? (
				Array(3)
					.fill(0)
					.map((_, i) => (
						<Fragment key={i}>
							<MySkeleton variant="round" height={72} />
							<Box pt={1} />
						</Fragment>
					))
			) : (
				<UniversitiesCards
					groupedByRoleUniversities={
						me.data?.me.groupedByRoleUniversities
					}
				/>
			)}
		</>
	);
}
