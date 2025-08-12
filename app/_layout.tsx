import {
  DMSans_400Regular,
  DMSans_700Bold,
  useFonts as useDmSansFonts,
} from "@expo-google-fonts/dm-sans";
import {
  Raleway_400Regular,
  Raleway_700Bold,
  useFonts as useRalewayFonts,
} from "@expo-google-fonts/raleway";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import "./globals.css";

export default function RootLayout() {
  const [dmSansLoaded] = useDmSansFonts({
    DMSans_400Regular,
    DMSans_700Bold,
  });

  const [ralewayLoaded] = useRalewayFonts({
    Raleway_400Regular,
    Raleway_700Bold,
  });

  const fontsLoaded = dmSansLoaded && ralewayLoaded;

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-color1">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
