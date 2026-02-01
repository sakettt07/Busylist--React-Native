import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { BusinessListType } from '../HomeScreen/PopularBusinessList'
import Colors from '@/services/Colors'

type Props = {
    businessDetail: BusinessListType
}

const BusinessDescription = ({ businessDetail }: Props) => {
    if (!businessDetail?.description) return null

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>About</Text>
            <Text style={styles.description}>
                {businessDetail.description}
            </Text>
        </View>
    )
}

export default BusinessDescription

const styles = StyleSheet.create({
    container: {
        marginTop: 24
    },
    heading: {
        fontFamily: 'appBoldFont',
        fontSize: 18,
        marginBottom: 8,
        color: Colors.BLACK
    },
    description: {
        fontSize: 14,
        lineHeight: 22,
        color: Colors.GRAY
    }
})
