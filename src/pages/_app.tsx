import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import { client } from '../store';
import { GlobalStylesProvider } from '../styles-provider';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>

			<ApolloProvider client={client}>
				<GlobalStylesProvider>
					<Component {...pageProps} />
				</GlobalStylesProvider>
			</ApolloProvider>
		</>
	);
}
