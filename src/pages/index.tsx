import { Routes } from 'domains/shared/constants/Routes';
import Link from 'next/link';

export default function Home() {
	return (
		<div>
			<h1>
				This is just the presentation page, to proceed to the app click{' '}
				<Link href={Routes.auth.LOGIN_REGISTER}>
					<a>here</a>
				</Link>
				.
			</h1>
		</div>
	);
}
