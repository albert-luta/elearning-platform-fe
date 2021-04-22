import { IconButton, IconButtonProps } from '@material-ui/core';
import { FC, forwardRef, memo } from 'react';
import { NextLinkComposed, NextLinkComposedProps } from '../NextLinkComposed';

export type IconButtonLinkProps = Omit<IconButtonProps<'a'>, 'href'> &
	NextLinkComposedProps;

export const IconButtonLink: FC<IconButtonLinkProps> = memo(
	forwardRef<HTMLAnchorElement, IconButtonLinkProps>(
		({ href, linkProps, ...iconButtonProps }, ref) => {
			return (
				<IconButton
					component={NextLinkComposed}
					href={typeof href === 'string' ? href : ''}
					linkProps={linkProps}
					ref={ref}
					{...iconButtonProps}
				/>
			);
		}
	)
);
IconButtonLink.displayName = 'IconButtonLink';
