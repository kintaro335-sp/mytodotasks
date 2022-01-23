import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ThemeProviderC from './theme';
import Rutas from './routes';

function App(): JSX.Element {
  return (
    <>
      <ThemeProviderC>
        <BrowserRouter>
          <Rutas />
        </BrowserRouter>
      </ThemeProviderC>
    </>
  );
}

export default App;
