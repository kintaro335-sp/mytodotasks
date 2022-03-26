import React from 'react';
import AuthContext from './contexts/AuthContext';
import ThemeProviderC from './theme';
import Rutas from './routes';
import Bar from './layout/Bar';

function App(): JSX.Element {
  return (
    <>
      <ThemeProviderC>
        <AuthContext>
          <Bar />
          <Rutas />
        </AuthContext>
      </ThemeProviderC>
    </>
  );
}

export default App;
