import { View, Text, ActivityIndicator, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { axiosClient } from '@/services/GlobalApi';
import { categoryType } from './Categories';
import Colors from '@/services/Colors';

export type BusinessListType = {
    name: string,
    description: string,
    address: string,
    isPremium: boolean,
    category: categoryType,
    images: ImagesType[],
    id: number
}
type ImagesType = {
    url: string
}

const PopularBusinessList = () => {
    const [businessListData, setBusinessListData] = useState<BusinessListType[]>([]);
    const [loading, setLoading] = useState(false);

    const getpopularBusinessList = async () => {
        setLoading(true);
        const result = await axiosClient.get('/business-lists?filters[isPremium][$eq]=true&populate=*');
        console.log("This is my business data---", JSON.stringify(result?.data?.data));
        setBusinessListData(result?.data?.data);
        setLoading(false);
    }

    useEffect(() => {
        getpopularBusinessList();
    }, [])
    return (
        <View style={{
            marginTop: 15
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 3
            }}>
                <Text style={{
                    fontSize: 20,
                    fontFamily: 'appBoldFont'
                }}>Popular Business</Text>
                <Text>View All</Text>
            </View>
            {loading && <ActivityIndicator size='large' color={Colors.PRIMARY} />}
            <FlatList horizontal={true} renderItem={({ item, index }) => (
                <View style={{
                    width: 200,
                    height: 190,
                    marginRight: 7,
                    backgroundColor: Colors.WHITE,
                    borderRadius: 10,
                }} key={index}>
                    <Image source={{ uri: item.images[0]?.url }} style={{
                        width: '100%',
                        height: 120,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10
                    }} />
                    <View style={{
                        padding: 6
                    }}>
                        <Text style={{
                            fontFamily: 'appBoldFont', fontSize: 17
                        }}>{item?.name}</Text>
                        <Text style={{
                            marginTop: 2,
                            color: Colors.GRAY
                        }}>{item.address}</Text>
                    </View>
                </View>
            )} data={businessListData} />
        </View>
    )
}

export default PopularBusinessList