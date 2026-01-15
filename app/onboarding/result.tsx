import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as Haptics from 'expo-haptics';
import ScreenLayout from '../../components/ScreenLayout';
import Colors from '../../constants/Colors';
import { useCreditStore } from '../../stores/useCreditStore';

export default function ResultScreen() {
    const { addCredits } = useCreditStore();

    useEffect(() => {
        // Add credits on mount? Or should have been done in processing?
        // Doing it here ensures user sees "+50 CREDITS" fresh.
        // But let's assume Processing did the "Allocation" visually, store updates now.
        // Ideally store update happens in processing logic or here.
        // Let's do it here once.
    }, []);

    const handleEnter = () => {
        router.push('/(tabs)');
    };

    return (
        <ScreenLayout>
            <View style={styles.container}>
                {/* Background Image (Mock Result) */}
                <View style={styles.imageContainer}>
                    {/* In real app, this is the generated image */}
                    <View style={styles.overlay}>
                        <Text style={styles.overlayText}>SIMULATION_COMPLETE</Text>
                    </View>
                </View>

                <View style={styles.hud}>
                    <Text style={styles.creditText}>+50 CREDITS ADDED</Text>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.button} onPress={handleEnter}>
                        <Text style={styles.buttonText}>[ ENTER NOVUS ]</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#222',
        zIndex: -1,
    },
    overlay: {
        position: 'absolute',
        top: 60,
        left: 20,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 4,
    },
    overlayText: {
        fontFamily: 'JetBrainsMono_400Regular',
        color: Colors.volt,
        fontSize: 12,
    },
    hud: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    creditText: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 32,
        color: Colors.volt,
        textShadowColor: 'rgba(208, 253, 62, 0.5)',
        textShadowRadius: 20,
    },
    footer: {
        padding: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: Colors.volt,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'Oswald_500Medium',
        fontSize: 16,
        color: Colors.deepBlack,
    }
});
