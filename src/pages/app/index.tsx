import { useMeQuery } from 'generated/graphql';

export default function App() {
	const me = useMeQuery({ fetchPolicy: 'no-cache' });

	return (
		<>
			<button
				onClick={async () => {
					try {
						const res = await me.refetch();
						console.log({ res });
					} catch (e) {
						console.log({ e });
					}
				}}
			>
				Refetch
			</button>
			<button onClick={() => console.log({ me })}>Me</button>
		</>
	);
}
