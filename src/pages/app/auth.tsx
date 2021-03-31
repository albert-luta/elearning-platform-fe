import { accessTokenVar } from '../../domains/auth/reactive-vars';
import { MyHead } from '../../domains/shared/components/MyHead';
import { useLoginMutation } from '../../generated/graphql';

export default function Auth() {
	const [login] = useLoginMutation();

	return (
		<>
			<MyHead title="Authentication" />

			<div>
				<button
					onClick={() => {
						login({
							variables: {
								user: {
									email: 'altceva@register.com',
									password: 'pass'
								}
							}
						})
							.then((res) => {
								accessTokenVar(res.data?.login.accessToken);
							})
							.catch(() => null);
					}}
				>
					Login
				</button>
			</div>
		</>
	);
}
