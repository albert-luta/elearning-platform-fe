import Link, { LinkProps } from 'next/link';
import { AnchorHTMLAttributes, FC, forwardRef, memo } from 'react';

export type NextLinkComposedProps = Omit<
	AnchorHTMLAttributes<HTMLAnchorElement>,
	'href'
> & {
	linkProps?: LinkProps;

	href: LinkProps['href'];
};

export const NextLinkComposed: FC<NextLinkComposedProps> = memo(
	forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
		({ href, linkProps, children, ...anchorProps }, ref) => {
			return (
				<Link {...linkProps} href={href}>
					<a {...anchorProps} ref={ref}>
						{children}
					</a>
				</Link>
			);
		}
	)
);
NextLinkComposed.displayName = 'NextLinkComposed';
