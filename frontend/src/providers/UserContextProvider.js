import {createContext, useState} from "react";
import {isDevelopment} from "../components/Utils";

export const userContext = createContext();

const API_URL = "https://localhost:7294/api/";

export const CLIENT_ROLE = "client";
export const ADMIN_ROLE = "administrator";

const UserProvider = ({children}) => {
    const fromStorage = (key, defaultValue = "") => {
        return localStorage.getItem(key) ?? defaultValue;
    }

    const [username, setUsername] = useState(fromStorage('username'))
    const [token, setToken] = useState(fromStorage('token'));
    const [roles, setRoles] = useState(fromStorage('roles', []));

    const isLogged = () => {
        return token.length > 0;
    }

    const login = async (login, password) => {
        const [response, isSuccess] = await Api("Auth/login", {
            method: "POST",
            body: {login, password}
        });

        if (!isSuccess) {
            throw response;
        }

        setUserData(response)

        if(isDevelopment){
            console.log("Logged as: ", response)
        }

        return true;
    };

    const logout = () => {
        setUserData({
            username: "",
            roles: [],
            token: ""
        });
    }

    const register = async ({login, password, email}) => {
        const [response, isSuccess] = await Api("Auth/register", {
            method: "POST",
            body: {login, password, email}
        });

        if (!isSuccess) {
            throw response.errors[0]
        }

        return true;
    }

    const setUserData = ({username, roles, token}) => {
        localStorage.setItem('username', username);
        setUsername(username);

        setRoles(roles);
        localStorage.setItem('roles', roles);

        setToken(token);
        localStorage.setItem('token', token);
    }

    const Api = async (address, init = {}) => {
        const response = await fetch(API_URL + address + createUriForQueryParams(init.queryParams), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getBearerToken(),
                ...init?.headers
            },
            ...init,
            body: JSON.stringify(init?.body),
        });

        return [await response.json(), response.ok]
    }

    const getBearerToken = () => {
        return `Bearer ${token}`;
    }

    const createUriForQueryParams = (queryParams) => {
        let params = [];

        if (queryParams) {
            for (const param in queryParams) {
                if (queryParams[param] != null && queryParams[param] !== undefined) {
                    params.push(`${param}=${queryParams[param]}`)
                }
            }
        }

        if (params.length > 0) {
            return '?' + params.toString();
        }

        return ""
    }

    return (
        <userContext.Provider value={{
            login, logout, register, isLogged, Api, username
        }}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider;






