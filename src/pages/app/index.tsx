import { useLogoutMutation, useTestAuthQuery } from '../../generated/graphql';

export default function App() {
	const [logout] = useLogoutMutation();
	const { data, error } = useTestAuthQuery();
	console.log({ data, error });

	return (
		<div>
			<button onClick={() => logout().catch(() => null)}>Logout</button>
			<br />
		</div>
	);
}
