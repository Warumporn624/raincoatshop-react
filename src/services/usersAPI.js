import axios from 'axios'

// Method read All Users
export const listUser = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + '/users', {
        headers: {
            authtoken,
        },
    });
}

export const changeEnabled = async (authtoken, value) => {
    return await axios.post(process.env.REACT_APP_API + '/change-enabled', value, {
        headers: {
            authtoken,
        },
    });
}

export const changeRole = async (authtoken, value) => {
    return await axios.post(process.env.REACT_APP_API + '/change-role', value, {
        headers: {
            authtoken,
        },
    });
}

export const deleteUser = async (authtoken, id) => {
    return await axios.delete(process.env.REACT_APP_API + '/users/' + id, {
        headers: {
            authtoken,
        },
    });
}

export const userCart = async (authtoken, cart) => {
    return await axios.post(process.env.REACT_APP_API + '/user/cart', { cart }, {
        headers: {
            authtoken,
        },
    });
}

export const getUserCart = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + '/user/cart', {
        headers: {
            authtoken,
        },
    });
}

export const emptyCart = async (authtoken) => {
    return await axios.delete(process.env.REACT_APP_API + '/user/cart', {
        headers: {
            authtoken,
        },
    });
}

export const getInformAddress = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + '/user/informAddress', {
        headers: {
            authtoken,
        },
    });
}

export const saveInformAddress = async (authtoken, informAddress) => {
    return await axios.post(process.env.REACT_APP_API + '/user/informAddress', { informAddress }, {
        headers: {
            authtoken,
        },
    });
}

export const saveOrder = async (authtoken) => {
    return await axios.post(process.env.REACT_APP_API + '/user/order', {}, {
        headers: {
            authtoken,
        },
    });
}

export const getOrders = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + '/user/orders', {
        headers: {
            authtoken,
        },
    });
}

export const getWishList = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + '/user/wishlist', {
        headers: {
            authtoken,
        },
    });
}

export const addWishList = async (authtoken, productId) => {
    return await axios.post(process.env.REACT_APP_API + '/user/wishlist', { productId }, {
        headers: {
            authtoken,
        },
    });
}

export const removeWishList = async (authtoken, productId) => {
    return await axios.put(process.env.REACT_APP_API + '/user/wishlist/' + productId, {}, {
        headers: {
            authtoken,
        },
    });
}

export const updateProduct = async (authtoken, id, product) => {
    return await axios.put(process.env.REACT_APP_API + '/product/'+ id, product,
        {
            headers: {
                authtoken,
            },
        });
}

export const getInvoice = async (authtoken, id) => {
    return await axios.get(process.env.REACT_APP_API + '/user/invoice/' + id, 
    {
        headers: {
            authtoken,
        },
    });
}

export const createPayment = async (authtoken, value) => {
    return await axios.post(process.env.REACT_APP_API + '/user/payment', value,
        {
            headers: {
                authtoken,
            },
        });
}