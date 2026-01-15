import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import Colors from '../../constants/Colors';
import { useCreditStore } from '../../stores/useCreditStore';
import * as Haptics from 'expo-haptics';

export default function LabScreen() {
    const { credits, deductCredits } = useCreditStore();
    const [protocol, setProtocol] = useState('DATE');
    const [time, setTime] = useState('NIGHT');

    const handleRun = () => {
        if (credits >= 10) {
            deductCredits(10);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            // Navigate to result or show modal
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
    };

    const Toggle = ({ label, active, onPress }: any) => (
        <TouchableOpacity
            style={[styles.toggle, active && styles.toggleActive]}
            onPress={onPress}
        >
            <Text style={[styles.toggleText, active && styles.toggleTextActive]}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <ScreenLayout>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>SIMULATION LAB</Text>
                    <Text style={styles.subtitle}>CREDITS: {credits}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>PROTOCOL</Text>
                    <View style={styles.row}>
                        <Toggle label="DATE" active={protocol === 'DATE'} onPress={() => setProtocol('DATE')} />
                        <Toggle label="OFFICE" active={protocol === 'OFFICE'} onPress={() => setProtocol('OFFICE')} />
                        <Toggle label="EVENT" active={protocol === 'EVENT'} onPress={() => setProtocol('EVENT')} />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>TIME VARIABLE</Text>
                    <View style={styles.row}>
                        <Toggle label="DAY" active={time === 'DAY'} onPress={() => setTime('DAY')} />
                        <Toggle label="NIGHT" active={time === 'NIGHT'} onPress={() => setTime('NIGHT')} />
                    </View>
                </View>

                <View style={[styles.section, { flex: 1, justifyContent: 'flex-end', minHeight: 100 }]}>
                    <TouchableOpacity style={styles.runButton} onPress={handleRun}>
                        <Text style={styles.runButtonText}>[ RUN SIMULATION (-10) ]</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexGrow: 1,
    },
    header: {
        marginTop: 20,
        marginBottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    title: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 24,
        color: Colors.textH1,
    },
    subtitle: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 14,
        color: Colors.volt,
    },
    section: {
        marginBottom: 30,
    },
    label: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 12,
        color: '#666',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    toggle: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.surface,
    },
    toggleActive: {
        backgroundColor: '#FFF',
        borderColor: '#FFF',
    },
    toggleText: {
        fontFamily: 'Oswald_500Medium',
        fontSize: 14,
        color: '#888',
    },
    toggleTextActive: {
        color: '#000',
    },
    runButton: {
        backgroundColor: Colors.volt,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    runButtonText: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 18,
        color: Colors.deepBlack,
    }
});
