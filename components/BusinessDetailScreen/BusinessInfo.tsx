import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { BusinessListType } from '../HomeScreen/PopularBusinessList'
import Ionicons from '@expo/vector-icons/Ionicons'
import Colors from '@/services/Colors'

type Props = {
    businessDetail: BusinessListType
}

const BusinessInfo = ({ businessDetail }: Props) => {
    console.log("This is my businessDetail=----", businessDetail?.website)
    return (
        <View style={styles.wrapper}>
            <Image
                source={{ uri: businessDetail?.images[0]?.url }}
                style={styles.image}
            />

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{businessDetail?.name}</Text>

                <View style={styles.row}>
                    <Ionicons name="location-outline" size={18} color={Colors.GRAY} />
                    <Text style={styles.subText}>{businessDetail?.address}</Text>
                </View>

                <View style={styles.row}>
                    <Ionicons name="globe-outline" size={18} color={Colors.GRAY} />
                    <Text style={styles.linkText}>{businessDetail?.website}</Text>
                </View>
            </View>
        </View>
    )
}

export default BusinessInfo

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 20
    },
    image: {
        width: '100%',
        height: 220,
        borderRadius: 16
    },
    infoContainer: {
        marginTop: 16
    },
    title: {
        fontFamily: 'appBoldFont',
        fontSize: 22,
        marginBottom: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        gap: 6
    },
    subText: {
        fontSize: 14,
        color: Colors.GRAY,
        flex: 1
    },
    linkText: {
        fontSize: 14,
        color: Colors.GRAY
    }
})
