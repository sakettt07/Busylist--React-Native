import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Linking,
    Share
} from 'react-native'
import React from 'react'
import { BusinessListType } from '../HomeScreen/PopularBusinessList'
import Ionicons from '@expo/vector-icons/Ionicons'
import Colors from '@/services/Colors'

type Props = {
    businessDetail: BusinessListType
}
// DL1/0251526/2025
const ActionButton = ({ businessDetail }: Props) => {

    const onNavigate = async () => {
        const nativeUrl =
            Platform.OS === 'ios'
                ? `maps:0,0?q=${businessDetail?.address}`
                : `geo:0,0?q=${businessDetail?.address}`

        await Linking.openURL(nativeUrl)
    }

    const onCall = async () => {
        const callUrl = `tel:${businessDetail?.phone}`
        await Linking.openURL(callUrl)
    }

    const onWebsite = async () => {
        const url = businessDetail?.website?.startsWith('http')
            ? businessDetail?.website
            : `https://${businessDetail?.website}`

        await Linking.openURL(url)
    }

    const onShare = async () => {
        await Share.share({
            message: `Check out this local business:\n\n${businessDetail?.name}`
        })
    }

    const handleActionPress = (label: string) => {
        switch (label) {
            case 'Navigate':
                onNavigate()
                break
            case 'Call':
                onCall()
                break
            case 'Website':
                onWebsite()
                break
            case 'Share':
                onShare()
                break
        }
    }

    return (
        <View style={styles.container}>
            {actions.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.actionItem}
                    onPress={() => handleActionPress(item.label)}
                    activeOpacity={0.7}
                >
                    <View style={styles.iconContainer}>
                        <Ionicons name={item.icon} size={22} color={Colors.PRIMARY} />
                    </View>
                    <Text style={styles.actionText}>{item.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default ActionButton

const actions = [
    { label: 'Navigate', icon: 'navigate-outline' },
    { label: 'Call', icon: 'call-outline' },
    { label: 'Website', icon: 'globe-outline' },
    { label: 'Share', icon: 'share-social-outline' }
]

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    actionItem: {
        alignItems: 'center',
        width: '22%'
    },
    iconContainer: {
        padding: 14,
        backgroundColor: Colors.BLACK,
        borderRadius: 16,
        marginBottom: 6
    },
    actionText: {
        fontFamily: 'appBoldFont',
        fontSize: 12,
        color: Colors.BLACK
    }
})
