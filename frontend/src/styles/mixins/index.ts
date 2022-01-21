import { css } from 'styled-components';

interface Flex {
	alignItems?: string;
	justifyContent?: string;
}

export const flexMixin = css<Flex>`
	display: flex;
	align-items: ${({ alignItems }) => alignItems ?? 'normal'};
	justify-content: ${({ justifyContent }) => justifyContent ?? 'normal'};
`;
