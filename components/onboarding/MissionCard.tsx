import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import Colors from '../../constants/Colors';

interface MissionCardProps {
    id: string;
    title: string;
    imageUri?: string; // Placeholder for now
    selected: boolean;
    onPress: () => void;
}

export default function MissionCard({ id, title, imageUri, selected, onPress }: MissionCardProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[
                styles.card,
                selected && styles.selectedCard,
            ]}>
            {/* Placeholder Visual if no image */}
            <View style={styles.imagePlaceholder}>
                {/* In real app, Image would go here */}
                <View style={styles.overlay} />
            </View>

            <View style={styles.labelContainer}>
                <Text style={styles.idText}>// {id}</Text>
                <Text style={[styles.titleText, selected && styles.selectedText]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        aspectRatio: 0.8, // Taller than wide
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    selectedCard: {
        borderColor: Colors.volt,
        borderWidth: 2,
    },
    imagePlaceholder: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#1a1a1a',
        // Add a gradient or pattern here later
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    labelContainer: {
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    idText: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 10,
        color: '#666',
        marginBottom: 4,
    },
    titleText: {
        fontFamily: 'Oswald_500Medium',
        fontSize: 14,
        color: '#888',
        textTransform: 'uppercase',
    },
    selectedText: {
        color: Colors.volt,
    },
});
