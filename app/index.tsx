import Colors from "@/services/Colors";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])
  return (
    <View
      style={styles.container}
    >
      <Image style={styles.homeImage} source={require('../assets/images/homeScreeen.jpg')} />
      <Text style={styles.heading}>Welcome To BusyList</Text>
      <View style={{
        padding: 20,
        backgroundColor: Colors.WHITE,
        margin: 20,
        borderRadius: 20
      }}>
        <Text style={{
          fontFamily: 'appSemi-BoldFont',
          fontSize: 15,
          textAlign: "center"
        }}>Discover thousands of local business all in one place</Text>
        <View style={styles.button}>
          <Image style={{
            width: 30, height: 30
          }} source={require('../assets/images/googleLogo.webp')} />
          <Text style={{
            fontFamily: 'appSemi-BoldFont',
            fontSize: 15
          }}>Sign In with Google</Text>
        </View>
        <View style={{
          backgroundColor: Colors.PRIMARY,
          borderColor: Colors.PRIMARY,
          padding: 10,
          alignItems: "center",
          marginTop: 10,
          borderRadius: 99
        }}>
          <Text style={{
            fontFamily: 'appSemi-BoldFont',
            fontSize: 15,

          }}>Skip</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    height: '100%'
  },
  homeImage: {
    width: '100%',
    height: 260,
    marginTop: 120
  },
  heading: {
    fontFamily: 'appFont',
    fontSize: 29,
    color: Colors.BLACK,
    textAlign: "center"
  },
  button: {
    borderWidth: 1,
    borderRadius: 99,
    padding: 10,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
    textAlign: "center"
  }

})
