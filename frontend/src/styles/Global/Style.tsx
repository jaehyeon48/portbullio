import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    font-family: NanumGothic, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${({ theme }) => theme.base.bgColor};
    color: ${({ theme }) => theme.base.textColor};
  }
`;
