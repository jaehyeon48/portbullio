import styled from 'styled-components';
import { navbarWidth } from '@constants';

export default styled.section`
	position: relative;
	width: calc(100% - ${navbarWidth}px);
	min-height: 100vh;
`;
