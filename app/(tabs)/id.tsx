import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import Colors from '../../constants/Colors';
import { useCreditStore } from '../../stores/useCreditStore';
import { useNovusStore } from '../../stores/useNovusStore';

export default function IDScreen() {
    const { credits, status } = useCreditStore();
    const { biometrics } = useNovusStore();

    return (
        <ScreenLayout>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>IDENTITY</Text>
                </View>

                {/* ID Card */}
                <View style={styles.idCard}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardHeaderTitle}>NOVUS PRIME ACCESS</Text>
                        <View style={styles.chip} />
                    </View>

                    <View style={styles.cardBody}>
                        <View style={styles.avatarContainer}>
                            {biometrics.faceData ? (
                                <Image source={{ uri: biometrics.faceData }} style={styles.avatar} />
                            ) : (
                                <View style={styles.avatarPlaceholder} />
                            )}
                        </View>
                        <View style={styles.infoCol}>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>STATUS</Text>
                                <Text style={styles.value}>{status}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>ARCHETYPE</Text>
                                <Text style={styles.value}>{biometrics.buildArchetype || 'UNKNOWN'}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>CREDITS</Text>
                                <Text style={[styles.value, { color: Colors.volt }]}>{credits}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Stats */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>METRICS</Text>
                    <View style={styles.statGrid}>
                        <View style={styles.statBox}>
                            <Text style={styles.statNum}>12</Text>
                            <Text style={styles.statLabel}>SIMULATIONS</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statNum}>84%</Text>
                            <Text style={styles.statLabel}>STYLE SCORE</Text>
                        </View>
                    </View>
                </View>

                {/* Settings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>SYSTEM</Text>
                    <TouchableOpacity style={styles.settingRow}>
                        <Text style={styles.settingText}>RECALIBRATE BIOMETRICS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingRow}>
                        <Text style={styles.settingText}>CLEAR CACHE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingRow}>
                        <Text style={[styles.settingText, { color: 'red' }]}>RESET PROTOCOL</Text>
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
        marginBottom: 30,
    },
    title: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 24,
        color: Colors.textH1,
    },
    idCard: {
        backgroundColor: Colors.surface,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.border,
        overflow: 'hidden',
        marginBottom: 30,
    },
    cardHeader: {
        backgroundColor: '#222',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    cardHeaderTitle: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 10,
        color: '#888',
        letterSpacing: 1,
    },
    chip: {
        width: 30,
        height: 20,
        backgroundColor: '#D4AF37', // Gold-ish
        borderRadius: 2,
    },
    cardBody: {
        padding: 20,
        flexDirection: 'row',
        gap: 20,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: Colors.volt,
        padding: 2,
    },
    avatar: {
        flex: 1,
        backgroundColor: '#333',
    },
    avatarPlaceholder: {
        flex: 1,
        backgroundColor: '#333',
    },
    infoCol: {
        flex: 1,
        justifyContent: 'space-between',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        paddingBottom: 4,
        marginBottom: 4,
    },
    label: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 10,
        color: '#666',
    },
    value: {
        fontFamily: 'Oswald_500Medium',
        fontSize: 14,
        color: '#FFF',
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 12,
        color: '#666',
        marginBottom: 10,
    },
    statGrid: {
        flexDirection: 'row',
        gap: 10,
    },
    statBox: {
        flex: 1,
        backgroundColor: Colors.surface,
        padding: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    statNum: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 24,
        color: Colors.textH1,
    },
    statLabel: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 10,
        color: '#666',
        marginTop: 4,
    },
    settingRow: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    settingText: {
        fontFamily: 'Oswald_500Medium',
        fontSize: 14,
        color: '#FFF',
    }
});
