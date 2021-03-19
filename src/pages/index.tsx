import { gql, useQuery } from '@apollo/client';
import { Button } from '@material-ui/core';

const GET_TEST_MESSAGE = gql`
	query GetTestMessage {
		message
	}
`;

export default function Home() {
	const { loading, data, error } = useQuery(GET_TEST_MESSAGE);

	if (loading) return <h1>Loading</h1>;

	if (error) return <h1>{error.message}</h1>;

	return (
		<div>
			<h1>Message: {data.message}</h1>
			<Button variant="contained" size="large">
				Primary
			</Button>
		</div>
	);
}
