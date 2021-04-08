import { css } from 'styled-components';

export const drawerTransitionMixin = (
	isOpen: boolean,
	fields: string | string[]
) => css`
	transition: ${({ theme }) =>
		theme.transitions.create(fields, {
			easing: theme.transitions.easing[isOpen ? 'easeOut' : 'sharp'],
			duration:
				theme.transitions.duration[
					isOpen ? 'enteringScreen' : 'leavingScreen'
				]
		})};
`;
