import axios from 'axios'

export const getOrdersAdmin = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + '/admin/orders', {
        headers: {
            authtoken,
        },
    });
}

export const getPayment = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + '/admin/check-payment', {
        headers: {
            authtoken,
        },
    });
}

export const changeOrderStatus = async (authtoken, value) => {
    return await axios.post(process.env.REACT_APP_API + '/change-order-status', value, {
        headers: {
            authtoken,
        },
    });
}

export const updateTrackingNumber = async (authtoken, value) => {
    return await axios.post(process.env.REACT_APP_API + '/change-tracking/', value, {
        headers: {
            authtoken,
        },
    });
}

export const searchOrders = async (authtoken, value) => {
    return await axios.post(process.env.REACT_APP_API + '/admin/orders', value, {
        headers: {
            authtoken,
        },
    });
}