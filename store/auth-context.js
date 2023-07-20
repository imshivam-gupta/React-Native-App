import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';
import { cartActions } from './cart-slice';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token,email) => {},
  googleAuthenticate: (data) => {},
  logout: () => {},
  checking: true,
});




function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [checking, setChecking] = useState(true);

    useEffect(() => {
        async function getStoredToken() {
            const token = await AsyncStorage.getItem('token');
            if(token) setAuthToken(token);
            setChecking(false);
        }
        getStoredToken();
    }, []);
    

    function authenticate(token) {
        setAuthToken(token);
        setChecking(false);
        AsyncStorage.setItem('token', token);
    }

    function googleAuthenticate(data) {
        setAuthToken(data.idToken);
        setChecking(false);
        AsyncStorage.setItem('token', data.idToken);
    }
    


    function logout() {
        setAuthToken(null);
        setChecking(false);
        cartActions.resetCart();
        AsyncStorage.removeItem('token');
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        googleAuthenticate: googleAuthenticate,
        logout: logout,
        checking: checking,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;