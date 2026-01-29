import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Colors from '@/services/Colors';
import { axiosClient } from '@/services/GlobalApi';
import { BusinessListType } from '@/components/HomeScreen/PopularBusinessList';

const BusinessList = () => {
    const { categoryName } = useLocalSearchParams();
    const [businessList, setBusinessList] = useState<BusinessListType[]>([]);
    const [loading, setLoading] = useState(false);
    console.log("This is my selected category name----", categoryName);
    const getBusinessByCategory = async () => {
        try {
            setLoading(true);
            const result = await axiosClient.get('/business-lists?filters[category][name][$eq]=' + categoryName);
            console.log("THis is my categoryy listing----", result?.data?.data);
            setBusinessList(result?.data?.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
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
            <Text style={{
                fontFamily: 'appBoldFont', fontSize: 25,
                color: Colors.WHITE
            }}>{categoryName} Business list</Text>
            <View>
                <TextInput placeholder='Search business' style={styles.search} />
            </View>
            {loading && <ActivityIndicator />}

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