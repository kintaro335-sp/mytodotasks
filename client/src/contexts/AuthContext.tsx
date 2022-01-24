/// <reference path="./AuthContext.d.ts" />
import React, { useState, useEffect, createContext, useCallback } from 'react';
import { isLogged } from 'src/api/users';

export const authContext = createContext({ username: '', logged: false, checkAuth: ()=> {} });

export default function AuthContext({ children }: any) {
  const [username, setUsername] = useState('');
  const [logged, setLogged] = useState(false);

  const checkAuth = useCallback(() => {
    isLogged().then((user: userT) => {
      setUsername(user.username);
      setLogged(user.logged);
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
