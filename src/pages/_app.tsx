import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import { client } from '../store';
import { GlobalStylesProvider } from '../styles-provider';
import { ProtectRoutes } from 'domains/auth/components/ProtectRoutes';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from 'domains/shared/utils/snackbar';
import { MyHead } from 'domains/shared/components/MyHead';
import { GlobalLayout } from 'domains/shared/components/GlobalLayout';
import { FC, memo } from 'react';
import { useRefreshTokensInterval } from 'domains/auth/hooks/useRefreshTokensInterval';
import { useKeepSelectedUniversityInSyncWithUrl } from 'domains/university/hooks/useKeepSelectedUniversityInSyncWithUrl';

const InsideProviders: FC = memo(function InsideProviders() {
	const finishedInitialRequest = useRefreshTokensInterval();
	useKeepSelectedUniversityInSyncWithUrl({ skip: !finishedInitialRequest });

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
					<SnackbarProvider>
						<SnackbarUtilsConfigurator />
						<ProtectRoutes>
							<InsideProviders />
							<GlobalLayout>
								<Component {...pageProps} />
							</GlobalLayout>
						</ProtectRoutes>
					</SnackbarProvider>
				</GlobalStylesProvider>
			</ApolloProvider>
		</>
	);
}
