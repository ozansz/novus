import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenLayout from '../../components/ScreenLayout';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Data Mocks
const LIKED_LOOKS = [
    { id: 'l1', title: 'NIGHT_OPS', image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=400' },
    { id: 'l2', title: 'BOARDROOM', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=400' },
    { id: 'l3', title: 'SUNDAY', image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=400' },
];

const SEASONAL_PROMOS = [
    { id: '1', title: 'SUMMER_ESSENTIALS', subtitle: 'LIGHTWEIGHT', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800' },
    { id: '2', title: 'WEDDING_SEASON', subtitle: 'FORMAL', image: 'https://images.unsplash.com/photo-1593030761757-71bd90dbe3e4?q=80&w=800' },
    { id: '3', title: 'RAINY_DAYS', subtitle: 'TECHNICAL', image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=800' },
];

const FOR_YOU = [
    { id: '4', title: 'URBAN_MINIMAL', subtitle: 'TRENDING', image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=400' },
    { id: '5', title: 'TECH_FLEECE', subtitle: 'MATCH', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=400' },
    { id: '6', title: 'WEEKEND_RUGGED', subtitle: 'NEW', image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=400' },
];

const SUGGESTED_EVENTS = [
    { id: 'e1', title: 'TOKYO_TRIP', subtitle: 'TRAVEL / CITY / COMFORT', day: '24', month: 'OCT' },
    { id: 'e2', title: 'FIRST_DATE', subtitle: 'SMART / CASUAL / IMPRESS', day: '02', month: 'NOV' },
    { id: 'e3', title: 'MORNING_GYM', subtitle: 'PERFORMANCE / TECH', day: '03', month: 'NOV' },
    { id: 'e4', title: 'BBQ_NIGHT', subtitle: 'RELAXED / OUTDOOR', day: '05', month: 'NOV' },
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

    const renderCardScroll = (data: any[], small = false) => (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollSection}>
            {data.map((item) => (
                <View key={item.id} style={[styles.card, small ? styles.cardSmall : styles.cardRegular]}>
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.placeholderText}>{item.title.split('_')[0]}</Text>
                    </View>
                    <View style={styles.cardOverlay}>
                        <Text style={styles.cardTitle}>{item.title.replace('_', ' ')}</Text>
                        {item.subtitle && <Text style={styles.cardSubtitle}>{item.subtitle}</Text>}
                    </View>
                </View>
            ))}
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

                {/* Liked Looks */}
                <Text style={styles.sectionTitle}>LIKED_LOOKS</Text>
                {renderCardScroll(LIKED_LOOKS, true)}

                {/* Seasonal Focus - Reduced Size */}
                {/* <Text style={styles.sectionTitle}>SEASONAL_FOCUS</Text>
                {renderCardScroll(SEASONAL_PROMOS, true)} */}

                {/* For You - Same UI as Seasonal */}
                <Text style={styles.sectionTitle}>FOR_YOU</Text>
                {renderCardScroll(FOR_YOU, true)}

                {/* Event Suggestions */}
                <Text style={styles.sectionTitle}>SUGGESTED_EVENTS</Text>
                {SUGGESTED_EVENTS.map((item) => (
                    <View key={item.id} style={styles.eventCard}>
                        <View style={styles.eventDate}>
                            <Text style={styles.eventDay}>{item.day}</Text>
                            <Text style={styles.eventMonth}>{item.month}</Text>
                        </View>
                        <View style={styles.eventInfo}>
                            <Text style={styles.eventTitle}>{item.title.replace('_', ' ')}</Text>
                            <Text style={styles.eventSubtitle}>{item.subtitle}</Text>
                        </View>
                        <TouchableOpacity style={styles.eventAction}>
                            <Ionicons name="arrow-forward" size={20} color={Colors.volt} />
                        </TouchableOpacity>
                    </View>
                ))}

                <View style={{ height: 100 }} />
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
        marginBottom: 8,
        letterSpacing: 1,
    },
    scrollSection: {
        marginBottom: 20,
    },
    card: {
        marginRight: 15,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    cardRegular: {
        width: width * 0.7,
        height: 250,
    },
    cardSmall: {
        width: width * 0.45,
        height: 180,
    },
    imagePlaceholder: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#1A1A1A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#333',
        fontFamily: 'Oswald_700Bold',
        fontSize: 18,
        textAlign: 'center',
    },
    cardOverlay: {
        padding: 12,
        backgroundColor: 'rgba(0,0,0,0.8)',
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
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
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
    eventCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.surface,
        marginBottom: 15,
    },
    eventDate: {
        alignItems: 'center',
        paddingRight: 20,
        borderRightWidth: 1,
        borderRightColor: Colors.border,
        width: 70,
    },
    eventDay: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 24,
        color: '#FFF',
    },
    eventMonth: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 12,
        color: Colors.volt,
    },
    eventInfo: {
        flex: 1,
        paddingLeft: 20,
    },
    eventTitle: {
        fontFamily: 'Oswald_500Medium',
        fontSize: 18,
        color: '#FFF',
    },
    eventSubtitle: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 10,
        color: '#888',
        marginTop: 6,
    },
    eventAction: {
        padding: 5,
    }
});
