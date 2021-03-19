import { FC, memo, useEffect } from 'react';
import { ThemeProvider as MaterialUiProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as StyledComponentsProvider } from 'styled-components';
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
	palette: {
		type: 'dark'
	}
});

console.log({ theme });

export const GlobalStylesProvider: FC = memo(function GlobalStylesProvider({
	children
}) {
	// Material-ui Server-side rendering thing
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles?.parentElement?.removeChild(jssStyles);
		}
	}, []);

	return (
		<MaterialUiProvider theme={theme}>
			<CssBaseline />
			<StyledComponentsProvider theme={theme}>
				{children}
			</StyledComponentsProvider>
		</MaterialUiProvider>
	);
});
