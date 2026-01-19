import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export interface Suggestion {
    id: string;
    label: string;
    icon?: string;
    type: 'weather' | 'event' | 'style';
}

interface SuggestionGridProps {
    suggestions: Suggestion[];
    onSelect: (suggestion: Suggestion) => void;
}

export default function SuggestionGrid({ suggestions, onSelect }: SuggestionGridProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>SUGGESTIONS</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {suggestions.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.card}
                        onPress={() => onSelect(item)}
                    >
                        <View style={styles.iconContainer}>
                            <Ionicons
                                name={item.type === 'weather' ? 'partly-sunny-outline' : item.type === 'event' ? 'calendar-outline' : 'shirt-outline'}
                                size={20}
                                color={Colors.volt}
                            />
                        </View>
                        <Text style={styles.label} numberOfLines={2}>{item.label}</Text>
                        <View style={styles.arrow}>
                             <Ionicons name="arrow-forward" size={12} color="#666" />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 80, // Above input
        left: 0,
        right: 0,
        height: 110,
        backgroundColor: 'rgba(5,5,5,0.9)',
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingTop: 10,
    },
    header: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 10,
        color: '#666',
        marginLeft: 20,
        marginBottom: 8,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        gap: 10,
    },
    card: {
        width: 120,
        height: 70,
        backgroundColor: Colors.surface,
        borderRadius: 8,
        padding: 10,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    iconContainer: {
        marginBottom: 5,
    },
    label: {
        fontFamily: 'Inter_500Medium',
        fontSize: 11,
        color: '#FFF',
    },
    arrow: {
        position: 'absolute',
        bottom: 8,
        right: 8,
    }
});
