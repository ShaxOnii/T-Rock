import {createContext, useState} from "react";

export const userContext = createContext();

const API_URL = "https://localhost:7294/api/"

const UserProvider = ({children}) => {
    // TODO: Implement provider Later !!!!
    const [username, setUsername] = useState(localStorage.key('username') ?? "")
    const [isLogged, setLogged] = useState(!!username);
    const [token, setToken] = useState("");
    const [role, setRole] = useState("");

    const login = (username, password) => {
        localStorage.setItem('username', username);
        setUsername(username);
        setLogged(true);
    };

    const logout = () => {
        localStorage.setItem('username', "");
        setUsername("");
        setLogged(false);
        setToken("");
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

    const Api = async (address, init = {}) => {
        console.log(init)
        const response = await fetch(API_URL + address + createUriForQueryParams(init.queryParams), {
            headers: {
                'Content-Type': 'application/json',
                ...init?.headers
            },
            ...init,
            body: JSON.stringify(init?.body),
        });

        return [await response.json(), response.ok]
    }

    return (
        <userContext.Provider value={{
            login, logout, isLogged, Api
        }}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider;






