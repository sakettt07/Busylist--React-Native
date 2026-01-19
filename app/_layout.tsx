import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'appFont': require('./../assets/fonts/Arimo-Regular.ttf'),
    'appBoldFont': require('./../assets/fonts/Arimo-Bold.ttf'),
    'appSemi-BoldFont': require('./../assets/fonts/Arimo-SemiBold.ttf'),
  })
  if (!fontsLoaded) {
    return <ActivityIndicator />
  }
  return <Stack />;
}
