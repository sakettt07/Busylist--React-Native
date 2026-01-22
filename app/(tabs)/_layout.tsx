import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Tabs, useNavigation } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '@/services/Colors';

export default function TabLayout() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.HOME_TAB
        }}>
            <Tabs.Screen options={{
                tabBarIcon: ({ color, size }) => <Entypo name="home" size={24} color={color} />
            }} name='Home' />
            <Tabs.Screen options={{
                tabBarIcon: ({ color, size }) => <MaterialIcons name="explore" size={24} color={color} />
            }} name='Explore' />
            <Tabs.Screen options={{
                tabBarIcon: ({ color, size }) => <Fontisto name="favorite" size={24} color={color} />
            }} name='Favorite' />
            <Tabs.Screen options={{
                tabBarIcon: ({ color, size }) => <AntDesign name="user" size={24} color={color} />
            }} name='Profile' />
        </Tabs>
    )
}