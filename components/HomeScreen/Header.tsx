import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import Colors from '@/services/Colors';

export default function Header() {
    const { user } = useUser();
    return (
        <View>
            <View style={styles.mainHeaderCont}>
                <View style={styles.headerCont}>
                    <Image source={{ uri: user?.imageUrl }} style={{
                        width: 40,
                        height: 40,
                        borderRadius: 99
                    }} />
                    <View style={styles.headTextCont}>
                        <Text style={styles.heading}>Welcome,</Text>
                        <Text style={[styles.heading, { fontFamily: 'appBoldFont' }]}>{user?.firstName}</Text>
                    </View>
                </View>
                <Image source={require('./../../assets/images/bell.png')} style={styles.bell} />
            </View>
            <TextInput style={styles.search} placeholder='Search' />
        </View>
    )
}
const styles = StyleSheet.create({
    heading: {
        fontSize: 15,
        fontFamily: 'appFont'
    },
    headTextCont: {
        // flexDirection: 'row'
    },
    headerCont: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    bell: {
        width: 25,
        height: 25
    },
    mainHeaderCont: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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