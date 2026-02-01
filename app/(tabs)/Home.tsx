import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Header from '@/components/HomeScreen/Header'
import Colors from '@/services/Colors'
import Sliders from '@/components/HomeScreen/Slider'
import Categories from '@/components/HomeScreen/Categories'
import PopularBusinessList from '@/components/HomeScreen/PopularBusinessList'

export default function Home() {
    return (
        <FlatList showsVerticalScrollIndicator={false} renderItem={null} data={[]} ListHeaderComponent={
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
                <Categories />
                <PopularBusinessList />
            </View>
        } />

    )
}