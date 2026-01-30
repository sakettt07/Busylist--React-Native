import { View, Text, TextInput, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Colors from '@/services/Colors';
import { axiosClient } from '@/services/GlobalApi';
import { BusinessListType } from '@/components/HomeScreen/PopularBusinessList';
import BusinessListCard from '@/components/BusinessList/BusinessListCard';
import Feather from '@expo/vector-icons/Feather';

const BusinessList = () => {
    const { categoryName } = useLocalSearchParams();
    const router = useRouter();
    const [businessList, setBusinessList] = useState<BusinessListType[]>([]);
    const [originalbusinessList, setOriginalBusinessList] = useState<BusinessListType[]>([]);
    const [loading, setLoading] = useState(false);
    const getBusinessByCategory = async () => {
        try {
            setLoading(true);
            const result = await axiosClient.get('/business-lists?filters[category][name][$eq]=' + categoryName + "&populate=*");
            console.log("THis is my categoryy listing----", result?.data?.data);
            setBusinessList(result?.data?.data);
            setOriginalBusinessList(result?.data?.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const onSearchFilter = (searchInput: string) => {
        if (!searchInput) {
            setBusinessList(originalbusinessList);
            return;
        }
        const filterList = originalbusinessList.filter((item) => item.name.toLocaleLowerCase().includes(searchInput?.toLowerCase()));
        setBusinessList(filterList);
    }
    useEffect(() => {
        getBusinessByCategory();
    }, [])
    return (
        <View style={{
            padding: 20,
            paddingTop: 50
        }}>
            <View style={{
                height: 160,
                backgroundColor: Colors.HOME_TAB,
                position: 'absolute',
                width: '200%'
            }}></View>
            <View style={{
                flexDirection: 'row',
                gap: 15,
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Feather name="arrow-left" size={20} color="black" />
                </TouchableOpacity>
                <Text style={{
                    fontFamily: 'appBoldFont', fontSize: 25,
                    color: Colors.WHITE
                }}>{categoryName} Business list</Text>
            </View>
            <View>
                <TextInput onChangeText={(value) => onSearchFilter(value)} placeholder='Search business' style={styles.search} />
            </View>
            {loading && <ActivityIndicator />}
            <FlatList data={businessList} onRefresh={() => getBusinessByCategory()} refreshing={loading} renderItem={({ item, index }) => (
                <BusinessListCard business={item} key={index} />
            )} />

        </View>
    )
}

export default BusinessList;

const styles = StyleSheet.create({
    search: {
        padding: 15,
        fontSize: 15,
        color: "#000",
        backgroundColor: Colors.WHITE,
        borderRadius: 99,
        paddingHorizontal: 20,
        marginTop: 15
    }
})