import { Stack } from 'expo-router';
import Colors from '../../constants/Colors';

export default function OnboardingLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: Colors.deepBlack },
                animation: 'fade', // Smooth transitions between onboarding steps
            }}>
            <Stack.Screen name="mission-select" />
            <Stack.Screen name="calibration" />
            <Stack.Screen name="height" />
            <Stack.Screen name="weight" />
            <Stack.Screen name="archetype" />
            <Stack.Screen name="face-id" />
            <Stack.Screen name="processing" />
            <Stack.Screen name="result" />
        </Stack>
    );
}
