import { FC, memo } from 'react';
import { Button, ButtonProps, CircularProgress } from '@material-ui/core';

type ButtonWithLoaderProps = ButtonProps & {
	loading: boolean;
	loaderSize?: string | number;
};

export const ButtonWithLoader: FC<ButtonWithLoaderProps> = memo(
	function ButtonWithLoader({
		loading,
		loaderSize = 24,
		children,
		...props
	}) {
		return (
			<Button {...props} disabled={loading}>
				{loading ? (
					<CircularProgress color="inherit" size={loaderSize} />
				) : (
					children
				)}
			</Button>
		);
	}
);
