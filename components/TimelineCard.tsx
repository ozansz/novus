import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface TimelineCardProps {
    title: string;
    startDate: Date;
    endDate: Date;
    location?: string;
    description?: string;
    isMock?: boolean;
}

export default function TimelineCard({ title, startDate, endDate, location, description, isMock }: TimelineCardProps) {
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <View style={styles.card}>
            <View style={styles.timeColumn}>
                <Text style={styles.timeText}>{formatTime(startDate)}</Text>
                <View style={styles.line} />
                <Text style={styles.timeText}>{formatTime(endDate)}</Text>
            </View>
            <View style={styles.contentColumn}>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>{title}</Text>
                    {isMock && <Text style={styles.mockBadge}>[MOCK]</Text>}
                </View>

                {location && (
                    <View style={styles.metaRow}>
                        <Ionicons name="location-outline" size={14} color={Colors.volt} />
                        <Text style={styles.metaText}>{location}</Text>
                    </View>
                )}

                {description && (
                    <Text style={styles.description} numberOfLines={2}>{description}</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        borderLeftWidth: 3,
        borderLeftColor: Colors.volt,
    },
    timeColumn: {
        alignItems: 'center',
        marginRight: 15,
        width: 50,
    },
    timeText: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 12,
        color: Colors.textBody,
    },
    line: {
        width: 1,
        flex: 1,
        backgroundColor: Colors.border,
        marginVertical: 5,
    },
    contentColumn: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    title: {
        fontFamily: 'Oswald_500Medium',
        fontSize: 18,
        color: Colors.textH1,
    },
    mockBadge: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 10,
        color: Colors.textBody,
        backgroundColor: '#333',
        paddingHorizontal: 5,
        borderRadius: 4,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginBottom: 8,
    },
    metaText: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 12,
        color: Colors.textBody,
    },
    description: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: '#BBB',
    },
});
