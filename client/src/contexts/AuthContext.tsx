/// <reference path="./AuthContext.d.ts" />
import React, { useState, useEffect, createContext } from 'react';
import { isLogged } from 'src/api/users';

export const authContext = createContext({ username: '', logged: false });

export default function AuthContext({ children }: any) {
  const [username, setUsername] = useState('');
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      isLogged().then((user: userT) => {
        setUsername(user.username);
        setLogged(user.logged);
      });
    }
    checkAuth();
  }, []);

  return (
    <>
      <authContext.Provider value={{ username, logged }}>
        {children}
      </authContext.Provider>
    </>
  );
}
