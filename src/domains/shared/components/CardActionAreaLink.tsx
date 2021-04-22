import { CardActionArea, CardActionAreaProps } from '@material-ui/core';
import { FC, forwardRef, memo } from 'react';
import { NextLinkComposed, NextLinkComposedProps } from './NextLinkComposed';

export type CardActionAreaLinkProps = Omit<CardActionAreaProps<'a'>, 'href'> &
	NextLinkComposedProps;

export const CardActionAreaLink: FC<CardActionAreaLinkProps> = memo(
	forwardRef<HTMLAnchorElement, CardActionAreaLinkProps>(
		({ href, linkProps, ...buttonProps }, ref) => {
			return (
				<CardActionArea
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
CardActionAreaLink.displayName = 'CardActionAreaLink';
