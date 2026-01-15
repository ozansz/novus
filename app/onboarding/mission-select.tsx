import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
// ... existing imports ...

import ScreenLayout from '../../components/ScreenLayout';
import MissionCard from '../../components/onboarding/MissionCard';
import Colors from '../../constants/Colors';
import { useNovusStore } from '../../stores/useNovusStore';

const MISSIONS = [
    { id: '01', title: 'DATE_NIGHT', missionKey: 'mission_date' },
    { id: '02', title: 'BOARDROOM', missionKey: 'mission_boardroom' },
    { id: '03', title: 'ACTIVE_DUTY', missionKey: 'mission_active' },
    { id: '04', title: 'NIGHT_OPS', missionKey: 'mission_night' },
    { id: '05', title: 'CASUAL_FRIDAY', missionKey: 'mission_casual' },
    { id: '06', title: 'GYM_SESSION', missionKey: 'mission_gym' },
    { id: '07', title: 'TRAVEL_MODE', missionKey: 'mission_travel' },
    { id: '08', title: 'SOCIAL_GATHERING', missionKey: 'mission_social' },
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
                <FlatList
                    data={MISSIONS}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.gridContent}
                    renderItem={({ item }) => (
                        <View style={styles.cardWrapper}>
                            <MissionCard
                                {...item}
                                selected={selectedMission === item.missionKey}
                                onPress={() => setSelectedMission(item.missionKey)}
                            />
                        </View>
                    )}
                />

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
    gridContent: {
        paddingBottom: 20,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    cardWrapper: {
        width: '48%',
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
