import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import Admin from './components/admin.js';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Admin/>
    </ThemeProvider>
  );
}

export default App;
