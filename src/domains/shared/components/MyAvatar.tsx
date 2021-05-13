import { Avatar, AvatarProps } from '@material-ui/core';
import { Maybe } from 'generated/graphql';
import Image from 'next/image';
import { FC, memo, useEffect } from 'react';
import { useBooleanState } from '../hooks/useBooleanState';

const MAX_AVATAR_LETTERS = 2;

interface MyAvatarProps {
	src: Maybe<string> | undefined;
	alt: string;
	variant?: AvatarProps['variant'];
	showIconFallback?: boolean;
}

export const MyAvatar: FC<MyAvatarProps> = memo(function MyAvatar({
	src,
	alt,
	variant,
	showIconFallback = false
}) {
	const [
		imageNotFound,
		setImageNotFound,
		resetImageNotFound
	] = useBooleanState();
	useEffect(resetImageNotFound, [src, resetImageNotFound]);

	console.log({ src });

	const fallbackText = alt
		.split(' ')
		.slice(0, MAX_AVATAR_LETTERS)
		.map((word) => word[0])
		.join('')
		.toUpperCase();

	return (
		<Avatar variant={variant}>
			{src != null && !imageNotFound ? (
				<Image
					src={src}
					alt={alt}
					layout="fill"
					objectFit="contain"
					onError={setImageNotFound}
				/>
			) : showIconFallback ? null : (
				fallbackText
			)}
		</Avatar>
	);
});
