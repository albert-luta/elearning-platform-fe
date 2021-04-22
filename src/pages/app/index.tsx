import { Box, Tooltip } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { IconButtonLink } from 'domains/shared/components/buttons/IconButtonLink';
import { ContentHeader } from 'domains/shared/components/layout/ContentHeader';
import { MySkeleton } from 'domains/shared/components/MySkeleton';
import { Routes } from 'domains/shared/constants/Routes';
import { UniversitiesCards } from 'domains/user/components/UniversitiesCards';
import { useMeQuery } from 'generated/graphql';
import { Fragment } from 'react';

export default function App() {
	const me = useMeQuery();

	return (
		<>
			<ContentHeader
				title="Universities"
				action={
					<Tooltip title="Create University">
						<IconButtonLink href={Routes.user.CREATE_UNIVERSITY}>
							<Add />
						</IconButtonLink>
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
