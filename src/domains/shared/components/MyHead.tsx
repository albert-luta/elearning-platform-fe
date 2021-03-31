import { FC, memo } from 'react';
import Head from 'next/head';
import { APP_NAME } from '../constants';

interface MyHeadProps {
	title?: string;
}

export const MyHead: FC<MyHeadProps> = memo(function MyHead({
	title,
	children
}) {
	return (
		<Head>
			<title>{title ? `${title} | ${APP_NAME}` : APP_NAME}</title>
			{children}
		</Head>
	);
});
