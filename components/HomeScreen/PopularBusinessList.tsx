import { View, Text } from 'react-native'
import React from 'react'

const PopularBusinessList = () => {
    return (
        <View style={{
            marginTop: 15
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Text style={{
                    fontSize: 20,
                    fontFamily: 'appBoldFont'
                }}>Popular Business</Text>
                <Text>View All</Text>
            </View>
        </View>
    )
}

export default PopularBusinessList