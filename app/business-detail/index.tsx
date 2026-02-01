import { View, TouchableOpacity, StyleSheet, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Colors from '@/services/Colors'
import Feather from '@expo/vector-icons/Feather'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import BusinessInfo from '@/components/BusinessDetailScreen/BusinessInfo'
import ActionButton from '@/components/BusinessDetailScreen/ActionButton'
import BusinessDescription from '@/components/BusinessDetailScreen/BusinessDescription'
import { axiosClient } from '@/services/GlobalApi'
import { useUser } from '@clerk/clerk-expo'
import axios from 'axios';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const BusinessDetail = () => {
    const { business } = useLocalSearchParams()
    const businessDetail = JSON.parse(business.toString());
    const [loading, setLoading] = useState(false);
    const [isFav, setIsFav] = useState(false);
    const [favDetail, setFavDetail] = useState<{ documentId: string }>();
    const router = useRouter();
    const { user } = useUser();

    const handleAddBookmark = async (businessId: number) => {
        try {
            setLoading(true)

            if (isFav) {
                await axiosClient.delete('/user-favorites/' + favDetail?.documentId)
                ToastAndroid.show('Removed from Favourites', ToastAndroid.TOP)
            } else {
                await axiosClient.post('/user-favorites', {
                    data: {
                        userEmail: user?.primaryEmailAddress?.emailAddress,
                        businessId
                    }
                })
                ToastAndroid.show('Added to Favourite', ToastAndroid.TOP)
            }

            await favMarked()
        } catch (error) {
            ToastAndroid.show('Something went wrong', ToastAndroid.TOP)
        } finally {
            setLoading(false)
        }
    }

    const favMarked = async () => {
        const result = await axiosClient.get('/user-favorites?filters[userEmail][$eq]=' + user?.primaryEmailAddress?.emailAddress + '&filters[businessId][$eq]=' + businessDetail?.id);
        const data = result?.data?.data;
        setFavDetail(data[0]);
        if (data?.length > 0) {
            setIsFav(true);
        }
        else {
            setIsFav(false);
        }
        console.log(result);
    }
    useEffect(() => {
        favMarked();
    }, [user])

    return (
        <View style={styles.screen}>
            {/* Background Header */}
            <View style={styles.headerBackground} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Feather name="arrow-left" size={22} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => handleAddBookmark(businessDetail?.id)}
                    disabled={loading}
                    activeOpacity={0.7}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color={Colors.BLACK} />
                    ) : isFav ? (
                        <MaterialIcons name="bookmark" size={22} color={Colors.BLACK} />
                    ) : (
                        <FontAwesome name="bookmark-o" size={22} color={Colors.BLACK} />
                    )}
                </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <BusinessInfo businessDetail={businessDetail} />
                <ActionButton businessDetail={businessDetail} />
                <BusinessDescription businessDetail={businessDetail} />
            </ScrollView>
        </View>
    )
}

export default BusinessDetail

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    headerBackground: {
        height: 180,
        backgroundColor: Colors.HOME_TAB,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    },
    header: {
        paddingTop: 50,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 30
    }
})
