import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: 'https://safe-fun-8882babc35.strapiapp.com/api',
    headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_PROD_TOKEN}`
    }
})