import { Button, ButtonProps } from '@material-ui/core';
import { FC, forwardRef, memo } from 'react';
import { NextLinkComposed, NextLinkComposedProps } from '../NextLinkComposed';

export type ButtonLinkProps = Omit<ButtonProps<'a'>, 'href'> &
	NextLinkComposedProps;

export const ButtonLink: FC<ButtonLinkProps> = memo(
	forwardRef<HTMLAnchorElement, ButtonLinkProps>(
		({ href, linkProps, ...buttonProps }, ref) => {
			return (
				<Button
					component={NextLinkComposed}
					href={typeof href === 'string' ? href : ''}
					linkProps={linkProps}
					ref={ref}
					{...buttonProps}
				/>
			);
		}
	)
);
ButtonLink.displayName = 'ButtonLink';
