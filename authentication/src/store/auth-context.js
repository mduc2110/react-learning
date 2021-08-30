import { createContext, useEffect, useState } from "react";

let logoutTimer;

const AuthContext = createContext({
    token: '',
    isLoggedIn: false,
    login : (token) => {},
    logout : () => {}
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration =  currentTime - adjExpirationTime;

    return remainingDuration;
}

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem("token");
    const storedExpirationDate = localStorage.getItem("expiratonTime");

    const remainingTime = calculateRemainingTime(storedExpirationDate);

    if(remainingTime <= 60000) {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        return null;
    }
    return {
        token: storedToken,
        duration: remainingTime
    }
}

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    let initialToken;
    if(tokenData) {
        initialToken = tokenData.token;
    }

    const [token, setToken] = useState(initialToken);
    const isLoggedIn = !!token;
    const login = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationTime", expirationTime);

        const remainingTime = calculateRemainingTime(expirationTime);
        logoutTimer = setTimeout(logout, remainingTime)
    }
    useEffect(() => {
        if(tokenData) {
            logoutTimer = setTimeout(logout, tokenData.duration);
        }
    }, [tokenData])
    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        if(logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }
    const value = {
        token,
        isLoggedIn,
        login,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthContext;