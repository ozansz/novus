import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import {
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_700Bold,
} from '@expo-google-fonts/oswald';
import {
    JetBrainsMono_400Regular,
    JetBrainsMono_700Bold,
} from '@expo-google-fonts/jetbrains-mono';
import {
    Inter_400Regular,
    Inter_700Bold,
    Inter_900Black,
} from '@expo-google-fonts/inter';

import Colors from '../constants/Colors';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        Oswald_400Regular,
        Oswald_500Medium,
        Oswald_700Bold,
        JetBrainsMono_400Regular,
        JetBrainsMono_700Bold,
        Inter_400Regular,
        Inter_700Bold,
        Inter_900Black,
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider value={DarkTheme}>
            <StatusBar style="light" />
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: Colors.deepBlack },
                    animation: 'slide_from_bottom',
                }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="onboarding" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </ThemeProvider>
    );
}
