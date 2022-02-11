import { createGlobalStyle } from 'styled-components';
import { globalScrollBarWidth } from '@constants/index';
import { flexMixin } from '../Mixins';

export default createGlobalStyle`
  body {
    font-family: NotoSansKR, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${({ theme }) => theme.base.bgColor};
    color: ${({ theme }) => theme.base.textColor};
    &::-webkit-scrollbar {
      width: ${globalScrollBarWidth}px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.scrollBar.global.backgroundColor};
      border-radius: 9px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: ${({ theme }) => theme.scrollBar.global.hoverBackgroundColor};
    }

  }

  #root {
    position: relative;
    ${flexMixin}
  }

  #modal-root {
    position:absolute;
    z-index: 999;
  }
`;
