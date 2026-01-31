import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const BusinessDetail = () => {
    const { business } = useLocalSearchParams();
    console.log("THis is my business----", business);
    return (
        <View>
            <Text>index</Text>
        </View>
    )
}

export default BusinessDetail