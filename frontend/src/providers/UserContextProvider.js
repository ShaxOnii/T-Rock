import {createContext, useContext, useState} from "react";
import {isDevelopment} from "../components/Utils";
import {useNavigate} from "react-router-dom";

export const userContext = createContext();

const API_URL = "https://localhost:7294/api/";

export const CLIENT_ROLE = "client";
export const ADMIN_ROLE = "admin";

const UserProvider = ({children}) => {

    const navigate = useNavigate();

    const fromStorage = (key, defaultValue = "") => {
        return localStorage.getItem(key) ?? defaultValue;
    }

    const objectFromStorage = (key, defaultValue = {}) => {
        return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
    }

    const [username, setUsername] = useState(fromStorage('username'))
    const [token, setToken] = useState(fromStorage('token'));
    const [roles, setRoles] = useState(objectFromStorage('roles', []));

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

    const register = async (login, password, email) => {
        const [response, isSuccess] = await Api("Auth/register", {
            method: "POST",
            body: {login, password, email}
        });

        if (!isSuccess) {
            throw response.errors[0]
        }

        return true;
    }

    const hasRole = (role) => {
       return roles.map(r => r.toLocaleLowerCase()).includes(role)
    }

    const setUserData = ({username, roles, token}) => {
        localStorage.setItem('username', username);
        setUsername(username);

        setRoles(roles);
        localStorage.setItem('roles', JSON.stringify(roles));

        setToken(token);
        localStorage.setItem('token', token);
    }

    const Api = async (address, init = {}) => {
        const response = await fetch(API_URL + address + createUriForQueryParams(init.queryParams), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getBearerToken(),
                'Accept': 'application/json',
                ...init?.headers
            },
            ...init,
            body: JSON.stringify(init?.body),
        });

        if(!response.ok){
            switch (response.status) {
                case 401:
                    navigate("/");
                    break;
                case 404:
                    navigate("/notFound");
                    break;
                default: break;
            }

            return [{}, false]
        }

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
            login, logout, register, isLogged, Api, hasRole, username
        }}>
            {children}
        </userContext.Provider>
    )
}

export const VisibleToRoles = ({roles, children}) => {
    const {hasRole} = useContext(userContext)


    const isVisible = () => {
        return roles.filter(hasRole).length > 0;
    }

    return (
        <>
            {isVisible() && children}
        </>
    )
}

export default UserProvider;






