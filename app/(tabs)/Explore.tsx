import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Colors from '@/services/Colors'
import { BusinessListType } from '@/components/HomeScreen/PopularBusinessList';
import { axiosClient } from '@/services/GlobalApi';
import { useRouter } from 'expo-router';

export default function Explore() {
    const [businessListData, setBusinessListData] = useState<BusinessListType[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState<string>('');
    const searchTimer = useRef<any>(null);
    const router = useRouter()

    const getpopularBusinessList = async () => {
        setLoading(true);
        const result = await axiosClient.get('/business-lists?filters[isPremium][$eq]=true&populate=*');
        setBusinessListData(result?.data?.data);
        setLoading(false);
    }

    useEffect(() => {
        getpopularBusinessList();
    }, []);

    const onchangeSearchText = (text: string) => {
        setSearchText(text);
        if (searchTimer?.current) {
            clearTimeout(searchTimer.current)
        }
        searchTimer.current = setTimeout(() => {
            if (text.trim() == '') {
                getpopularBusinessList();
            }
            else {
                searchBusiness(text);
            }
        }, 500);
    }
    const searchBusiness = async (text: string) => {
        setLoading(true);
        const result = await axiosClient.get(`/business-lists?filters[name][$containsi]=${text}` + '&populate=*');
        console.log("This is my business data---", JSON.stringify(result?.data?.data));
        setBusinessListData(result?.data?.data);
        setLoading(false);
    }
    return (
        <View style={{
            padding: 20,
            paddingTop: 45
        }}>
            <View style={styles.headerBackground} />

            <Text style={styles.headline}>Explore more business</Text>
            <TextInput onChangeText={(value) => onchangeSearchText(value)} style={styles.search} placeholder='Search' />
            <FlatList onRefresh={() => searchText ? searchBusiness(searchText) : getpopularBusinessList()} refreshing={loading} style={{
                marginBottom: 90
            }} showsVerticalScrollIndicator={false} data={businessListData} renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => router.push({
                    pathname: '/business-detail',
                    params: {
                        business: JSON.stringify(item)
                    }
                })} style={{
                    borderWidth: 1,
                    borderColor: Colors.HOME_TAB,
                    marginTop: 15,
                    backgroundColor: Colors.WHITE,
                    borderRadius: 20
                }} key={index}>
                    <Image source={{ uri: item?.images[0]?.url }} style={{
                        width: '100%', height: 170, borderTopLeftRadius: 15, borderTopRightRadius: 15
                    }} />
                    <View style={{
                        padding: 10
                    }}>
                        <Text style={{
                            fontFamily: 'appBoldFont'
                        }}>{item?.name}</Text>
                        <Text style={{
                            fontFamily: 'appBoldFont',
                            fontSize: 13,
                            color: Colors.GRAY
                        }}>{item?.address}</Text>
                    </View>
                </TouchableOpacity>
            )} />
        </View>
    )
}
const styles = StyleSheet.create({
    headerBackground: {
        height: 180,
        backgroundColor: Colors.HOME_TAB,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    },
    headline: {
        fontFamily: 'appBoldFont',
        fontSize: 24
    },
    search: {
        padding: 15,
        fontSize: 16,
        color: "#000",
        backgroundColor: Colors.WHITE,
        borderRadius: 99,
        paddingHorizontal: 20,
        marginTop: 15
    }
})