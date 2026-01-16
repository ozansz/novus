import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenLayout from '../../components/ScreenLayout';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { StyleImages } from '../../constants/StyleImages';
import { SeedStyles } from '../../constants/SeedStyles';

const { width } = Dimensions.get('window');

const SEASONAL_FOCUS_ENABLED = false;

// Helper to get subtitle from SeedStyles
const getVibe = (key: string) => {
    const style = SeedStyles.find(s => s.name === key);
    return style ? style.vibe_tags[0].toUpperCase() : 'TRENDING';
};

// Data Mocks with Real Images and SeedKeys
const LIKED_LOOKS = [
    { id: 'l1', title: 'NIGHT_OPS', seedKey: "Techwear" },
    { id: 'l2', title: 'BOARDROOM', seedKey: "Business Formal" },
    { id: 'l3', title: 'SUNDAY', seedKey: "Casual Everyday" },
];

const SEASONAL_FOCUS = [
    { id: '1', title: 'SUMMER_ESSENTIALS', seedKey: "Cyber-Linen" },
    { id: '2', title: 'WEDDING', seedKey: "Romantic Aesthetic" },
    { id: '3', title: 'RAINY_DAYS', seedKey: "Hyperclean Techwear" },
];

const FOR_YOU = [
    { id: '4', title: 'URBAN_MINIMAL', seedKey: "Minimalist Modern" },
    { id: '5', title: 'TECH_FLEECE', seedKey: "Quiet Luxury Sport" },
    { id: '6', title: 'WEEKEND_RUGGED', seedKey: "Rugged Workwear" },
];

const NEXT_ADVENTURES = [
    { id: 'e1', title: 'TOKYO_TRIP', subtitle: 'URBAN EXPLORATION', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800' },
    { id: 'e2', title: 'FIRST_DATE', subtitle: 'MAKE AN IMPRESSION', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800' },
    { id: 'e3', title: 'MORNING_GYM', subtitle: 'HIGH PERFORMANCE', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800' },
    { id: 'e4', title: 'BBQ_NIGHT', subtitle: 'RELAXED SOCIAL', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800' },
];

export default function HomeScreen() {
    const router = useRouter();
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) setGreeting('GOOD MORNING');
        else if (hour >= 12 && hour < 17) setGreeting('GOOD AFTERNOON');
        else setGreeting('WELCOME BACK');
    }, []);

    const handleCreate = () => {
        router.push('/(tabs)/lab');
    };

    const handleCardPress = (seedKey: string) => {
        router.push({ pathname: '/style/[id]', params: { id: seedKey } });
    };

    const renderCardScroll = (data: any[]) => (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollSection}>
            {data.map((item) => {
                const imageSource = StyleImages[item.seedKey] || { uri: item.image };
                const subtitle = getVibe(item.seedKey);

                return (
                    <TouchableOpacity key={item.id} style={styles.cardPortrait} onPress={() => handleCardPress(item.seedKey)}>
                        <Image source={imageSource} style={styles.cardImage} resizeMode="cover" />
                        <View style={styles.cardOverlay}>
                            <Text style={styles.cardTitle}>{item.title.replace('_', ' ')}</Text>
                            <Text style={styles.cardSubtitle}>{subtitle}</Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );

    return (
        <ScreenLayout>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.greeting}>{greeting}</Text>
                    <Text style={styles.date}>JUNE 14, 2026</Text>
                </View>

                {/* Liked Looks */}
                <Text style={styles.sectionTitle}>LIKED_LOOKS</Text>
                {renderCardScroll(LIKED_LOOKS)}

                {/* Primary CTA */}
                <TouchableOpacity style={styles.ctaContainer} onPress={handleCreate}>
                    <View style={styles.ctaContent}>
                        <Text style={styles.ctaTitle}>GENERATE NEW LOOK</Text>
                        <Text style={styles.ctaSubtitle}>INITIATE BESPOKE FITTING</Text>
                    </View>
                    <View style={styles.ctaIcon}>
                        <Ionicons name="scan-outline" size={24} color={Colors.deepBlack} />
                    </View>
                </TouchableOpacity>

                {/* Seasonal Focus */}
                {SEASONAL_FOCUS_ENABLED && <Text style={styles.sectionTitle}>SEASONAL_FOCUS</Text>}
                {SEASONAL_FOCUS_ENABLED && renderCardScroll(SEASONAL_FOCUS)}

                {/* For You */}
                <Text style={styles.sectionTitle}>FOR_YOU</Text>
                {renderCardScroll(FOR_YOU)}

                {/* Next Adventure */}
                <Text style={styles.sectionTitle}>NEXT_ADVENTURE</Text>
                {NEXT_ADVENTURES.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.adventureCard}>
                        <Image source={{ uri: item.image }} style={styles.adventureImage} resizeMode="cover" />
                        <View style={styles.adventureOverlay}>
                            <View>
                                <Text style={styles.adventureTitle}>{item.title.replace('_', ' ')}</Text>
                                <Text style={styles.adventureSubtitle}>{item.subtitle}</Text>
                            </View>
                            <Ionicons name="arrow-forward" size={24} color={Colors.volt} />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        marginBottom: 30,
    },
    greeting: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 32,
        color: Colors.textH1,
        textTransform: 'uppercase',
    },
    date: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 12,
        color: Colors.textBody,
        marginTop: 5,
    },
    sectionTitle: {
        fontFamily: 'Oswald_500Medium',
        fontSize: 18,
        color: Colors.textH1,
        marginBottom: 10,
        letterSpacing: 1,
    },
    scrollSection: {
        marginBottom: 25,
    },
    cardPortrait: {
        width: width * 0.4, // Slightly smaller width for 3:4 portrait feel
        aspectRatio: 3 / 4,
        marginRight: 15,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    cardImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    cardOverlay: {
        padding: 12,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '100%',
    },
    cardTitle: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 14,
        color: '#FFF',
    },
    cardSubtitle: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 10,
        color: Colors.volt,
        marginTop: 4,
    },
    ctaContainer: {
        backgroundColor: Colors.volt,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    ctaContent: {
        flex: 1,
    },
    ctaTitle: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 22,
        color: Colors.deepBlack,
    },
    ctaSubtitle: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 12,
        color: Colors.deepBlack,
        marginTop: 4,
    },
    ctaIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: Colors.deepBlack,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Next Adventure Styles
    adventureCard: {
        width: '100%',
        aspectRatio: 16 / 9,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.surface,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },
    adventureImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    adventureOverlay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    adventureTitle: {
        fontFamily: 'Oswald_500Medium',
        fontSize: 20,
        color: '#FFF',
        textTransform: 'uppercase',
    },
    adventureSubtitle: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 12,
        color: Colors.volt,
        marginTop: 4,
    }
});
