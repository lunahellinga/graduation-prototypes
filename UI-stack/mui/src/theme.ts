import {Sevillana} from 'next/font/google';
import {createTheme} from '@mui/material/styles';

export const font = Sevillana({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    background: {
      default: 'f9f9f9'
    },
    primary: {
      main: '#556cd6',
    },
    info: {
      main: '#3ABEF9',
    }
  },
  typography: {
    fontFamily: font.style.fontFamily,
    fontSize: 18
  },
});

export default theme;
