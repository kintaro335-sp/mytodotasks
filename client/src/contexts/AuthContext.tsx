/// <reference path="./AuthContext.d.ts" />
import React, { useState, useEffect, createContext, useCallback } from 'react';
import { isLogged } from '../api/users';

export const authContext = createContext({
  username: '',
  logged: false,
  checkAuth: async () => {}
});

export default function AuthContext({ children }: any) {
  const [username, setUsername] = useState<string>('');
  const [logged, setLogged] = useState<boolean>(false);

  const checkAuth = useCallback(async () => {
    await isLogged().then((response) => {
      setUsername(response.data.username);
      setLogged(response.data.logged);
    });
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <authContext.Provider value={{ username, logged, checkAuth }}>
        {children}
      </authContext.Provider>
    </>
  );
}
