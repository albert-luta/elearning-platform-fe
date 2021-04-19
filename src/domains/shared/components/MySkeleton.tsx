import { Skeleton, SkeletonProps } from '@material-ui/lab';
import { FC, memo } from 'react';

type MySkeletonProps = Omit<SkeletonProps, 'variant'> & {
	variant?: SkeletonProps['variant'] | 'round';
};

export const MySkeleton: FC<MySkeletonProps> = memo(function MySkeleton({
	variant,
	className = '',
	...props
}) {
	const isRound = variant === 'round';

	return (
		<Skeleton
			{...props}
			variant={isRound ? 'rect' : (variant as SkeletonProps['variant'])}
			className={`${className} ${isRound ? 'MuiPaper-rounded' : ''}`}
		/>
	);
});
