import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({});

export default function ThemeProviderC({ children }: any): JSX.Element {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
