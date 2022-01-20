import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    font-family: NanumGothic, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
  }
`;
