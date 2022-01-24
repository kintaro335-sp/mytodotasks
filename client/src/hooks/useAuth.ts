import { useContext } from 'react';
import { authContext } from 'src/contexts/AuthContext';

const useAuth = () => useContext(authContext);

export default useAuth;
