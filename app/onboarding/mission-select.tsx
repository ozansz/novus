import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import MissionCard from '../../components/onboarding/MissionCard';
import Colors from '../../constants/Colors';
import { useNovusStore } from '../../stores/useNovusStore';

const MISSIONS = [
    { id: '01', title: 'DATE_NIGHT', key: 'mission_date' },
    { id: '02', title: 'BOARDROOM', key: 'mission_boardroom' },
    { id: '03', title: 'ACTIVE_DUTY', key: 'mission_active' },
    { id: '04', title: 'NIGHT_OPS', key: 'mission_night' },
];

export default function MissionSelectScreen() {
    const [selectedMission, setSelectedMission] = useState<string | null>(null);

    // In a real app, we might store the mission in the store. 
    // For now, let's assume it just sets the initial "Style Vector" context.
    // We can add a specialized field in the store if needed later.

    const handleConfirm = () => {
        if (selectedMission) {
            router.push('/onboarding/calibration');
        }
    };

    return (
        <ScreenLayout>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>DEFINE OBJECTIVE</Text>
                    <Text style={styles.subtitle}>SELECT PRIMARY OPTIMIZATION PROTOCOL.</Text>
                </View>

                {/* Grid */}
                <View style={styles.grid}>
                    <View style={styles.row}>
                        <MissionCard
                            {...MISSIONS[0]}
                            selected={selectedMission === MISSIONS[0].key}
                            onPress={() => setSelectedMission(MISSIONS[0].key)}
                        />
                        <View style={{ width: 10 }} />
                        <MissionCard
                            {...MISSIONS[1]}
                            selected={selectedMission === MISSIONS[1].key}
                            onPress={() => setSelectedMission(MISSIONS[1].key)}
                        />
                    </View>
                    <View style={{ height: 10 }} />
                    <View style={styles.row}>
                        <MissionCard
                            {...MISSIONS[2]}
                            selected={selectedMission === MISSIONS[2].key}
                            onPress={() => setSelectedMission(MISSIONS[2].key)}
                        />
                        <View style={{ width: 10 }} />
                        <MissionCard
                            {...MISSIONS[3]}
                            selected={selectedMission === MISSIONS[3].key}
                            onPress={() => setSelectedMission(MISSIONS[3].key)}
                        />
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.button, !selectedMission && styles.buttonDisabled]}
                        disabled={!selectedMission}
                        onPress={handleConfirm}
                    >
                        <Text style={[styles.buttonText, !selectedMission && styles.buttonTextDisabled]}>
                            [ CONFIRM PROTOCOL ]
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    header: {
        marginTop: 20,
        marginBottom: 20,
    },
    title: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 32,
        color: Colors.textH1,
        marginBottom: 4,
    },
    subtitle: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 12,
        color: Colors.textBody,
    },
    grid: {
        flex: 1,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    footer: {
        marginBottom: 20,
    },
    button: {
        backgroundColor: Colors.volt,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.volt,
    },
    buttonDisabled: {
        backgroundColor: 'transparent',
        borderColor: Colors.border,
    },
    buttonText: {
        fontFamily: 'Oswald_500Medium',
        fontSize: 16,
        color: Colors.deepBlack,
        letterSpacing: 1,
    },
    buttonTextDisabled: {
        color: Colors.textBody,
    },
});
