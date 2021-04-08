import { Button, ButtonProps } from '@material-ui/core';
import { FC, memo } from 'react';
import { NextLinkComposed, NextLinkComposedProps } from '../NextLinkComposed';

type ButtonLinkProps = Omit<ButtonProps<'a'>, 'href'> & NextLinkComposedProps;

export const ButtonLink: FC<ButtonLinkProps> = memo(function ButtonLink({
	href,
	linkProps,
	children,
	...buttonProps
}) {
	return (
		<Button
			component={NextLinkComposed}
			href={typeof href === 'string' ? href : ''}
			linkProps={linkProps}
			{...buttonProps}
		>
			{children}
		</Button>
	);
});
