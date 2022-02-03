import styled from 'styled-components';
import { navbarWidth } from '@constants';

const PageContainer = styled.section`
	position: relative;
	width: calc(100% - ${navbarWidth}px);
	min-height: 100vh;
`;

export default PageContainer;
