import { Button } from '@material-ui/core';
import { useGetTestMessageQuery } from '../generated/graphql';

export default function Home() {
	const { loading, data, error } = useGetTestMessageQuery();

	if (loading) return <h1>Loading</h1>;

	if (error) return <h1>{error.message}</h1>;

	return (
		<div>
			<h1>Message: {data?.justForQuery.exampleField}</h1>
			<Button variant="contained" size="large">
				Primary
			</Button>
		</div>
	);
}
