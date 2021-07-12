import { FC, useEffect } from 'react';
import {
	makeStyles,
	ThemeProvider as MaterialUiProvider
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
	DefaultTheme,
	ThemeProvider as StyledComponentsProvider
} from 'styled-components';
import { createMuiTheme } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from 'domains/shared/utils/snackbar';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import dateFnsUtils from '@date-io/date-fns';

const theme: DefaultTheme = createMuiTheme({
	palette: {
		type: 'dark'
	}
});

const useStyles = makeStyles((theme: DefaultTheme) => ({
	contentRoot: {
		background: theme.palette.grey[900],
		color: theme.palette.getContrastText(theme.palette.grey[900])
	}
}));

export const GlobalStylesProvider: FC = ({ children }) => {
	const classes = useStyles();

	// Material-ui Server-side rendering thing
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles?.parentElement?.removeChild(jssStyles);
		}
	}, []);

	return (
		<StyledComponentsProvider theme={theme}>
			<MaterialUiProvider theme={theme}>
				<CssBaseline />
				<MuiPickersUtilsProvider utils={dateFnsUtils}>
					{/* Classes prop not correctly typed at this moment */}
					<SnackbarProvider classes={classes as any} preventDuplicate>
						<SnackbarUtilsConfigurator />
						{children}
					</SnackbarProvider>
				</MuiPickersUtilsProvider>
			</MaterialUiProvider>
		</StyledComponentsProvider>
	);
};
