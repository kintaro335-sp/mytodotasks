import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import ThemeProviderC from './theme';
import Rutas from './routes';

function App(): JSX.Element {
  return (
    <>
      <ThemeProviderC>
        <AuthContext>
          <BrowserRouter>
            <Rutas />
          </BrowserRouter>
        </AuthContext>
      </ThemeProviderC>
    </>
  );
}

export default App;
