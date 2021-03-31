import { useSnackbar, WithSnackbarProps } from 'notistack';
import { FC, memo } from 'react';

export let SnackbarUtils: WithSnackbarProps;

export const SnackbarUtilsConfigurator: FC = memo(
	function SnackbarUtilsConfigurator() {
		SnackbarUtils = useSnackbar();

		return null;
	}
);
