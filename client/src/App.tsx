import React, { Suspense } from 'react';
import ThemeProviderC from './theme';
import Loading from './pages/Loading';
import Rutas from './routes';
import Bar from './layout/Bar';
import useAuth from './hooks/useAuth';

function App(): JSX.Element {
  const { isInicialized } = useAuth();
  return (
    <>
      <ThemeProviderC>
        <Bar />
        <Suspense fallback={<Loading />}>
          {isInicialized ? <Rutas /> : <Loading />}
        </Suspense>
      </ThemeProviderC>
    </>
  );
}

export default App;
