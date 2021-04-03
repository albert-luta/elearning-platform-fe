import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import { client } from '../store';
import { GlobalStylesProvider } from '../styles-provider';
import { ProtectRoutes } from 'domains/auth/components/ProtectRoutes';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from 'domains/shared/utils/snackbar';
import { RefreshTokens } from 'domains/auth/components/RefreshTokens';
import { MyHead } from 'domains/shared/components/MyHead';

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
					<SnackbarProvider>
						<SnackbarUtilsConfigurator />
						<RefreshTokens>
							<ProtectRoutes>
								<Component {...pageProps} />
							</ProtectRoutes>
						</RefreshTokens>
					</SnackbarProvider>
				</GlobalStylesProvider>
			</ApolloProvider>
		</>
	);
}
