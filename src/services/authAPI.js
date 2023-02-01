import axios from 'axios'

export const registerAPI = async (value) => {
    return await axios.post(process.env.REACT_APP_API + '/register', value);
}

export const login = async (value) => {
    return await axios.post(process.env.REACT_APP_API + '/login', value);
}

export const currentUser = async (authtoken) => {
    return await axios.post(process.env.REACT_APP_API + '/current-user', {},
        {
            headers: {
                authtoken,
            },
        });
}

export const currentAdmin = async (authtoken) => {
    return await axios.post(process.env.REACT_APP_API + '/current-admin', {},
        {
            headers: {
                authtoken,
            },
        });
}

