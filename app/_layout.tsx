import { SplashScreen, router, Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { useEffect, useState } from "react";
import { UserServiceInstance } from "../services/UserService";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),

  })

  const [isLoading, setIsLoading] = useState(true); // Stan ładowania
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Stan logowania

  const checkToken = async () : Promise<void> => {
    try {
      
      const response = await UserServiceInstance.validateToken();
      
      if (response && response.status === 200) {
          setIsLoggedIn(true);
      }
    } catch (error) {
        console.error('Error validating token:', error);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      throw error;
    } 

    if (fontsLoaded && isLoading) {
      checkToken();
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/apiaries');
    }
  }, [isLoggedIn]);

  if (!fontsLoaded || isLoading || error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="settings" options={{headerShown: false}}/>
      <Stack.Screen name="(auth)" options={{headerShown: false}}/>
      <Stack.Screen name="(apiaries)" options={{headerShown: false}}/>
      <Stack.Screen name="(hives)" options={{headerShown: false}}/>
      <Stack.Screen name="(hiveDashboard)" options={{headerShown: false}}/>
      <Stack.Screen name="(mothers)" options={{headerShown: false}}/>
      <Stack.Screen name="(families)" options={{headerShown: false}}/>
      <Stack.Screen name="(harvests)" options={{headerShown: false}}/>
      <Stack.Screen name="(treatments)" options={{headerShown: false}}/>
    </Stack>
  );
}
