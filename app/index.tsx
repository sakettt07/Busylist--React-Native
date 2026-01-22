import Colors from "@/services/Colors";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useCallback } from "react";
import { Image, StyleSheet, Text, View, Button, Platform, TouchableOpacity, Pressable } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { useSSO, useUser } from "@clerk/clerk-expo";
import { axiosClient } from "@/services/GlobalApi";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== 'android') return
    void WebBrowser.warmUpAsync()
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync()
    }
  }, [])
}
WebBrowser.maybeCompleteAuthSession()

export default function Index() {
  useWarmUpBrowser();
  const { startSSOFlow } = useSSO()
  const navigation = useNavigation();
  const { user } = useUser();
  console.log("This is my user----", user);
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  const onPress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: 'oauth_google',
        // For web, defaults to current path
        // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
        // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
        redirectUrl: AuthSession.makeRedirectUri(),
      })

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({
          session: createdSessionId,
          // Check for session tasks and navigate to custom UI to help users resolve them
          // See https://clerk.com/docs/guides/development/custom-flows/overview#session-tasks
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask)
              router.push('/')
              return
            }

            router.push('/')
          },
        })
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // See https://clerk.com/docs/guides/development/custom-flows/authentication/oauth-connections#handle-missing-requirements
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }, []);

  useEffect(() => {
    user && createNewUser();
  }, [user])

  const createNewUser = async () => {
    try {
      const result = await axiosClient.post('/user-lists', {
        data: {
          FullName: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress
        }
      })
      console.log("This is my inserted Data--", result.data);
      router.replace('/(tabs)/Home')
    } catch (error) {
      console.log(error);
      router.replace('/(tabs)/Home')

    }
  }

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
        <Pressable onPress={onPress} style={({ pressed }) => [
          styles.button,
          pressed && { opacity: 0.6 }
        ]}>
          <Image style={{
            width: 30, height: 30
          }} source={require('../assets/images/googleLogo.webp')} />
          <Text style={{
            fontFamily: 'appSemi-BoldFont',
            fontSize: 15, marginLeft: 30
          }}>Sign In with Google</Text>
        </Pressable>
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
    textAlign: "center"
  }

})

// 1:03
