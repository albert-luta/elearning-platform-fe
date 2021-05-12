import { Routes } from 'domains/shared/constants/Routes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
	const router = useRouter();
	useEffect(() => {
		router.prefetch(Routes.auth.LOGIN_REGISTER.path);
		router.prefetch(Routes.user.DASHBOARD.path);
	}, [router]);

	return (
		<div>
			<h1>
				This is just the presentation page, to proceed to the app click{' '}
				<Link href={Routes.auth.LOGIN_REGISTER.path}>
					<a>here</a>
				</Link>
				.
			</h1>
		</div>
	);
}
