import Document, {
	DocumentContext,
	Head,
	Html,
	Main,
	NextScript
} from 'next/document';
import { ServerStyleSheet as StyledComponentsSheet } from 'styled-components';
import { ServerStyleSheets as MaterialUiSheet } from '@material-ui/core/styles';
import { resetServerContext } from 'react-beautiful-dnd';

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const styledComponentsSheet = new StyledComponentsSheet();
		const materialUiSheet = new MaterialUiSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						styledComponentsSheet.collectStyles(
							materialUiSheet.collect(<App {...props} />)
						)
				});

			const initialProps = await Document.getInitialProps(ctx);
			resetServerContext();

			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{materialUiSheet.getStyleElement()}
						{styledComponentsSheet.getStyleElement()}
					</>
				)
			};
		} finally {
			styledComponentsSheet.seal();
		}
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
