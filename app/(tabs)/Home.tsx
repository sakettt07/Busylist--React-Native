import { View, Text } from 'react-native'
import React from 'react'
import Header from '@/components/HomeScreen/Header'
import Colors from '@/services/Colors'
import Sliders from '@/components/HomeScreen/Slider'

export default function Home() {
    return (
        <View style={{
            paddingTop: 60,
            padding: 20
        }}>
            <View style={{
                height: 200,
                width: '200%',
                backgroundColor: Colors.HOME_TAB,
                position: "absolute"
            }}></View>
            <Header />
            <Sliders />
        </View>
    )
}