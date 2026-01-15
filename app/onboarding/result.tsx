import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import ScreenLayout from '../../components/ScreenLayout';
import Colors from '../../constants/Colors';
import { useCreditStore } from '../../stores/useCreditStore';

export default function ResultScreen() {
    const { addCredits } = useCreditStore();

    useEffect(() => {
        // Add credits logic (already handled or assume handled)
    }, []);

    const handleEnter = () => {
        router.replace('/(tabs)/feed');
    };

    return (
        <ScreenLayout>
            <View style={styles.container}>
                {/* Background Image Placeholder */}
                <View style={styles.imageContainer}>
                    <View style={styles.overlay} />
                    {/* Top Left Status */}
                    <View style={{ position: 'absolute', top: 60, left: 20 }}>
                        <Text style={{ color: Colors.volt, fontFamily: 'JetBrainsMono_400Regular', fontSize: 10, letterSpacing: 1 }}>SYSTEM_STATUS</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.volt, marginRight: 6 }} />
                            <Text style={{ color: '#FFF', fontFamily: 'JetBrainsMono_400Regular', fontSize: 12 }}>SIMULATION_COMPLETE</Text>
                        </View>
                    </View>
                </View>

                {/* Center Box: Unlocked Bonus */}
                <View style={styles.centerContent}>
                    <View style={styles.bonusBox}>
                        <Text style={styles.bonusLabel}>UNLOCKED_BONUS</Text>
                        <Text style={styles.bonusValue}>
                            +50 <Text style={{ color: Colors.volt }}>CREDITS</Text>
                        </Text>
                        <Text style={styles.bonusAction}>ADDED</Text>
                        {/* Loading/Progress Bar */}
                        <View style={styles.progressBar}>
                            <View style={styles.progressFill} />
                            <View style={styles.progressDot} />
                            <View style={styles.progressDot} />
                        </View>
                    </View>
                </View>

                {/* Bottom Content */}
                <View style={styles.footer}>
                    {/* Verification Metrics */}
                    <View style={styles.metricsContainer}>
                        <View style={styles.metricRow}>
                            <Ionicons name="checkmark-circle" size={18} color={Colors.volt} />
                            <Text style={styles.metricText}>FIT: 98% MATCH</Text>
                        </View>
                        <View style={styles.metricRow}>
                            <Ionicons name="checkmark-circle-outline" size={18} color={Colors.volt} />
                            <Text style={styles.metricText}>STYLE: OPTIMIZED</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleEnter}>
                        <Text style={styles.buttonText}>[ ENTER NOVUS ]</Text>
                    </TouchableOpacity>

                    <View style={styles.footerMeta}>
                        <Text style={styles.metaText}>USER_ID: NV-8891</Text>
                        <Text style={styles.metaText}>AUTH_TOKEN: VERIFIED</Text>
                    </View>
                </View>
            </View>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    imageContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#111', // Placeholder for image
        zIndex: -1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bonusBox: {
        borderWidth: 2,
        borderColor: Colors.volt,
        paddingVertical: 30,
        paddingHorizontal: 40,
        backgroundColor: 'rgba(0,0,0,0.8)',
        alignItems: 'center',
        width: '80%',
    },
    bonusLabel: {
        color: Colors.volt,
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 10,
        letterSpacing: 1,
        marginBottom: 10,
    },
    bonusValue: {
        color: '#FFF',
        fontFamily: 'Oswald_700Bold',
        fontSize: 36,
        marginBottom: 0,
    },
    bonusAction: {
        color: '#FFF',
        fontFamily: 'Oswald_700Bold',
        fontSize: 36,
        marginBottom: 20,
    },
    progressBar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    progressFill: {
        width: 40,
        height: 4,
        backgroundColor: Colors.volt,
    },
    progressDot: {
        width: 4,
        height: 4,
        backgroundColor: 'rgba(208, 253, 62, 0.3)',
    },
    footer: {
        padding: 20,
        paddingBottom: 40,
    },
    metricsContainer: {
        marginBottom: 20,
        gap: 8,
    },
    metricRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    metricText: {
        color: '#FFF',
        fontFamily: 'Oswald_700Bold',
        fontSize: 18,
        textTransform: 'uppercase',
    },
    button: {
        backgroundColor: Colors.volt,
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    buttonText: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 16,
        color: Colors.deepBlack,
        letterSpacing: 2,
    },
    footerMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    metaText: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 8,
        color: '#555',
        letterSpacing: 1,
    }
});
