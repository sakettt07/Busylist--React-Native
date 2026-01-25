import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { axiosClient } from '@/services/GlobalApi';

const Categories = () => {
    const GetSliders = async () => {
        try {
            const response = await axiosClient.get("/categories");
            console.log(response.data?.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        GetSliders();
    }, []);
    return (
        <View>
            <Text>Categories</Text>
        </View>
    )
}

export default Categories