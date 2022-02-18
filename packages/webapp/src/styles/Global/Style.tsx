import { createGlobalStyle } from 'styled-components';
import { globalScrollBarWidth } from '@constants/index';
import { flexMixin } from '../Mixins';

export default createGlobalStyle`
  html {
    --colorBaseWhite: 0, 0;
    --colorBaseBlueGray: 210, 17%;
    --colorBaseGreen: 162, 90%;
    --white: hsla(0, 0%, 100%);
    --dark: hsla(0, 0%, 0%);
    --primary: hsla(var(--colorBaseGreen), 35%);
  }

  html[data-theme='light'] {
    /* Global */
    --baseTextColor: var(--dark);
    --bodyBgColor: hsla(var(--colorBaseBlueGray), 98%);
    --globalScrollBarThumbBgColor: hsla(var(--colorBaseBlueGray), 68%);
    --globalScrollBarThumbBgColorHover: hsla(var(--colorBaseBlueGray), 53%);
    --globalScrollBarTrackBgColor: hsla(var(--colorBaseBlueGray), 93%);

    /* Navbar */
    --navbarBgColor: var(--white);
    --navbarDropdownBorderColor: hsla(var(--colorBaseBlueGray), 70%);
    --navbarIconBgColor: hsla(var(--colorBaseBlueGray), 60%);
  }

  html[data-theme='dark'] {
    /* Global */
    --baseTextColor: var(--white);
    --bodyBgColor: hsla(var(--colorBaseBlueGray), 12%);
    --globalScrollBarThumbBgColor: hsla(var(--colorBaseBlueGray), 42%);
    --globalScrollBarThumbBgColorHover: hsla(var(--colorBaseBlueGray), 57%);
    --globalScrollBarTrackBgColor: hsla(var(--colorBaseBlueGray), 17%);

    /* Navbar */
    --navbarBgColor: hsla(var(--colorBaseBlueGray), 14%);
    --navbarDropdownBorderColor: hsla(var(--colorBaseBlueGray), 25%);
    --navbarIconBgColor: hsla(var(--colorBaseBlueGray), 66%);
  }

  body {
    font-family: NotoSansKR, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--bodyBgColor);
    color: var(--baseTextColor);

    &::-webkit-scrollbar {
      width: ${globalScrollBarWidth}px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--globalScrollBarThumbBgColor);
      border-radius: 9px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: var(--globalScrollBarThumbBgColorHover);
    }

    &::-webkit-scrollbar-track {
      background-color: var(--globalScrollBarTrackBgColor);
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
