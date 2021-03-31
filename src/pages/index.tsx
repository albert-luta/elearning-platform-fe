import Link from 'next/link';

export default function Home() {
	return (
		<div>
			<h1>
				This is just the presentation page, to proceed to the app click{' '}
				<Link href="/app/auth">
					<a>here</a>
				</Link>
				.
			</h1>
		</div>
	);
}
