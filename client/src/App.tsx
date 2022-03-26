import React, { Suspense } from 'react';
import AuthContext from './contexts/AuthContext';
import ThemeProviderC from './theme';
import Loading from './pages/Loading';
import Rutas from './routes';
import Bar from './layout/Bar';

function App(): JSX.Element {
  return (
    <>
      <ThemeProviderC>
        <AuthContext>
          <Bar />
          <Suspense fallback={<Loading />}>
            <Rutas />
          </Suspense>
        </AuthContext>
      </ThemeProviderC>
    </>
  );
}

export default App;
