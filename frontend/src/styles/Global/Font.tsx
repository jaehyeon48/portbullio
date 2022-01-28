import { createGlobalStyle } from 'styled-components';
import notoSansKR400Woff2 from '@assets/fonts/noto_sans_kr_400.woff2';
import notoSansKR400Woff from '@assets/fonts/noto_sans_kr_400.woff';
import notoSansKR500Woff2 from '@assets/fonts/noto_sans_kr_500.woff2';
import notoSansKR500Woff from '@assets/fonts/noto_sans_kr_500.woff';
import notoSansKR700Woff2 from '@assets/fonts/noto_sans_kr_700.woff2';
import notoSansKR700Woff from '@assets/fonts/noto_sans_kr_700.woff';

export default createGlobalStyle`
  @font-face {
  	font-family: 'NotoSansKR';
  	font-style: normal;
  	font-weight: 400;
  	src: local('NotoSansKR'),
      url(${notoSansKR400Woff2}) format('woff2'),
  	  url(${notoSansKR400Woff}) format('woff');
  }

	@font-face {
  	font-family: 'NotoSansKR';
  	font-style: normal;
  	font-weight: 500;
  	src: local('NotoSansKR'),
      url(${notoSansKR500Woff2}) format('woff2'),
  	  url(${notoSansKR500Woff}) format('woff');
  }

  @font-face {
  	font-family: 'NotoSansKR';
  	font-style: normal;
  	font-weight: 700;
  	src: local('NotoSansKR'),
      url(${notoSansKR700Woff2}) format('woff2'),
  	  url(${notoSansKR700Woff}) format('woff');
  }
`;
