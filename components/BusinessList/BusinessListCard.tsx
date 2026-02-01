import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { BusinessListType } from '../HomeScreen/PopularBusinessList'
import Colors from '@/services/Colors'
import { useRouter } from 'expo-router'

type Props = {
    business: BusinessListType
}
const BusinessListCard = ({ business }: Props) => {

    const router = useRouter();
    return (
        <TouchableOpacity onPress={() => router.push({
            params: {
                business: JSON.stringify(business)
            },
            pathname: "/business-detail"
        })} style={{
            padding: 7,
            backgroundColor: Colors.WHITE,
            borderRadius: 15,
            marginTop: 20,
            display: 'flex',
            flexDirection: 'row',
            gap: 10
        }}>
            <Image source={{ uri: business?.images[0]?.url }} style={{
                width: 90,
                height: 90,
                borderRadius: 15
            }} />
            <View style={{
                paddingTop: 10
            }}>
                <Text style={{
                    fontSize: 20,
                    fontFamily: 'appBoldFont'
                }}>{business?.name}</Text>
                <Text style={{

                }}>{business?.address}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default BusinessListCard