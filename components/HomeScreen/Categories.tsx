import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { axiosClient } from '@/services/GlobalApi';

type categoryType = {
    name: string,
    isPremium: boolean,
    image: { url: string }
}
const Categories = () => {
    const [categoryList, setCategoryList] = useState<categoryType[]>([]);
    const GetCategories = async () => {
        try {
            const response = await axiosClient.get("/categories?filters[isPremium][$eq]=true&populate=*");
            setCategoryList(response?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        GetCategories();
    }, []);
    return (
        <View style={{
            marginTop: 15
        }}>
            <View style={{
                display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'
            }}>
                <Text style={{ fontFamily: 'appBoldFont', fontSize: 20 }}>Categories</Text>
                <Text>
                    View All
                </Text>
            </View>
            <FlatList numColumns={3} data={categoryList} renderItem={({ item, index }) => (
                <TouchableOpacity style={{
                    flex: 1,
                    alignItems: 'center',
                    padding: 10
                }}>
                    <Image style={{
                        width: 60, height: 60, borderRadius: 99
                    }} source={{ uri: item?.image?.url }} />
                    <Text>{item.name}</Text>
                </TouchableOpacity>
            )} />
        </View>
    )
}

export default Categories