import { createGlobalStyle } from 'styled-components';
import { flexMixin } from '../mixins';

export default createGlobalStyle`
  body {
    font-family: NanumGothic, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${({ theme }) => theme.base.bgColor};
    color: ${({ theme }) => theme.base.textColor};
  }

  #root {
    ${flexMixin}
  }

  #modal-root {
    position:absolute;
    z-index: 999;
  }
`;
