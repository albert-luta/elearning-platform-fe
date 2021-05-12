import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import { client } from '../store';
import { GlobalStylesProvider } from '../styles-provider';
import { MyHead } from 'domains/shared/components/MyHead';
import { GlobalLayout } from 'domains/shared/components/GlobalLayout';
import { FC, memo } from 'react';
import { useRefreshTokensInterval } from 'domains/auth/hooks/useRefreshTokensInterval';
import { useKeepSelectedUniversityInSyncWithUrl } from 'domains/university/hooks/useKeepSelectedUniversityInSyncWithUrl';
import { useKeepRoutesAuthenticated } from 'domains/auth/hooks/useKeepRoutesAuthenticated';
import { InitialAuth } from 'domains/auth/components/InitialAuth';
import { useKeepRoutesAuthorized } from 'domains/auth/hooks/useKeepRoutesAuthorized';

const InsideProviders: FC = memo(function InsideProviders() {
	useKeepRoutesAuthenticated();
	useKeepRoutesAuthorized();
	useRefreshTokensInterval();
	useKeepSelectedUniversityInSyncWithUrl();

	return null;
});

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<MyHead>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
			</MyHead>

			<ApolloProvider client={client}>
				<GlobalStylesProvider>
					<InitialAuth>
						<InsideProviders />

						<GlobalLayout>
							<Component {...pageProps} />
						</GlobalLayout>
					</InitialAuth>
				</GlobalStylesProvider>
			</ApolloProvider>
		</>
	);
}
