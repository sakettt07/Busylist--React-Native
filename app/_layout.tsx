import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from "@clerk/clerk-expo/token-cache";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'appFont': require('./../assets/fonts/Arimo-Regular.ttf'),
    'appBoldFont': require('./../assets/fonts/Arimo-Bold.ttf'),
    'appSemi-BoldFont': require('./../assets/fonts/Arimo-SemiBold.ttf'),
  })
  if (!fontsLoaded) {
    return <ActivityIndicator />
  }
  return (<ClerkProvider tokenCache={tokenCache}>
    <Stack screenOptions={{
      headerShown: false
    }} />
  </ClerkProvider>);
}
