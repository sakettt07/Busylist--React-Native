import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { axiosClient } from '@/services/GlobalApi';
import { BusinessListType } from '@/components/HomeScreen/PopularBusinessList';
import Colors from '@/services/Colors';
import BusinessListCard from '@/components/BusinessList/BusinessListCard';

export default function Favorite() {

    const { user } = useUser();
    const [businessList, setBusinessList] = useState<BusinessListType[]>([]);
    const [loading, setLoading] = useState(false);

    const GetUserFavBusinesList = async () => {
        try {
            setLoading(true);
            const result = await axiosClient.get('/user-favorites?filters[userEmail][$eq]=' + user?.primaryEmailAddress?.emailAddress);
            let businessIds: any = [];
            const favList = result?.data?.data;
            favList.forEach((item: any) => {
                businessIds.push(item?.businessId)
            });
            console.log(businessIds);
            await getBusinessList(businessIds);
            setLoading(false);
        } catch (error) {
            console.log(error)
        }

    }
    const getBusinessList = async (businessId: []) => {
        const result = await axiosClient.get('/business-lists', {
            params: {
                "filters[id][$in]": businessId,
                "populate": "*"
            }
        })
        setBusinessList(result?.data?.data);
    }
    useEffect(() => {
        GetUserFavBusinesList();
    }, [])
    return (
        <View style={{
            paddingTop: 45,
            padding: 25
        }}>
            <View style={styles.headerBackground} />
            <Text style={styles.headline}>Favourite business</Text>
            <TextInput style={styles.search} placeholder='Search' />
            <FlatList refreshing={loading} onRefresh={() => GetUserFavBusinesList()} data={businessList} renderItem={({ item, index }) => (
                <BusinessListCard business={item} key={index} />
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