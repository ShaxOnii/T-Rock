
import {createContext, useState} from "react";

export const userContext = createContext();

const API_URL = "http://localhost:9000/api/"

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

    const Api = async (address, init) => {
        const response = await fetch(API_URL + address, {
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






