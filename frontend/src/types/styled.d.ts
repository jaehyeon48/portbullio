import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		base: {
			bgColor: string;
			textColor: string;
			primary: string;
		};
	}
}
