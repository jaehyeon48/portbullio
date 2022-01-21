import { createGlobalStyle } from 'styled-components';
import NanumGothicRegularWoff2 from '@assets/fonts/NanumGothic.woff2';
import NanumGothicRegularWoff from '@assets/fonts/NanumGothic.woff';
import NanumGothicBoldWoff2 from '@assets/fonts/NanumGothicBold.woff2';
import NanumGothicBoldWoff from '@assets/fonts/NanumGothicBold.woff';

export default createGlobalStyle`
  @font-face {
  	font-family: 'NanumGothic';
  	font-style: normal;
  	font-weight: 400;
  	src: local('NanumGothic'),
      url(${NanumGothicRegularWoff2}) format('woff2'),
  	  url(${NanumGothicRegularWoff}) format('woff');
  }
  @font-face {
  	font-family: 'NanumGothic';
  	font-style: normal;
  	font-weight: 700;
  	src: local('NanumGothic'),
      url(${NanumGothicBoldWoff2}) format('woff2'),
  	  url(${NanumGothicBoldWoff}) format('woff');
  }
`;
