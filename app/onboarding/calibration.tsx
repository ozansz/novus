import { router } from 'expo-router';
import { useState, useEffect, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageSourcePropType } from 'react-native';
import * as Haptics from 'expo-haptics';
import ScreenLayout from '../../components/ScreenLayout';
import CalibrationDeck, { CalibrationDeckRef } from '../../components/onboarding/CalibrationDeck';
import Colors from '../../constants/Colors';
import { useNovusStore } from '../../stores/useNovusStore';
import { SeedStyles } from '../../constants/SeedStyles';
import { StyleImages } from '../../constants/StyleImages';

const TOTAL_CARDS = 10;

export default function CalibrationScreen() {
    const [index, setIndex] = useState(0);
    const deckRef = useRef<CalibrationDeckRef>(null);
    const { setStyleVector } = useNovusStore();

    // Select 10 random styles on mount
    const selectedStyles = useMemo(() => {
        // Shuffle array
        const shuffled = [...SeedStyles].sort(() => 0.5 - Math.random());
        // Take first 10
        const selected = shuffled.slice(0, TOTAL_CARDS);
        // Map to image sources
        return selected.map(style => ({
            name: style.name,
            source: StyleImages[style.name]
        }));
    }, []);


    const handleSwipeRight = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setIndex((prev) => prev + 1);
        // Logic: Add to style vector
    };

    const handleSwipeLeft = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setIndex((prev) => prev + 1);
        // Logic: Ignore
    };

    const handleFinished = () => {
        router.push('/onboarding/intro-data');
    };

    // If we exceeded cards, move on (handled by component or here)
    useEffect(() => {
        if (index >= TOTAL_CARDS) {
            const timeout = setTimeout(() => {
                handleFinished();
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [index]);

    return (
        <ScreenLayout>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>CALIBRATE STYLE</Text>
                    <Text style={styles.counter}>IMG_0{Math.min(index + 1, TOTAL_CARDS)} / {TOTAL_CARDS}</Text>
                </View>

                <View style={styles.deckContainer}>
                    <CalibrationDeck
                        ref={deckRef}
                        currentIndex={index}
                        totalCards={TOTAL_CARDS}
                        images={selectedStyles}
                        onSwipeRight={handleSwipeRight}
                        onSwipeLeft={handleSwipeLeft}
                    />
                </View>

                <View style={styles.footer}>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.actionButton, styles.discardBtn]} onPress={() => deckRef.current?.swipeLeft()}>
                            <Text style={styles.actionBtnText}>DISCARD</Text>
                        </TouchableOpacity>
                        <View style={{ width: 20 }} />
                        <TouchableOpacity style={[styles.actionButton, styles.acceptBtn]} onPress={() => deckRef.current?.swipeRight()}>
                            <Text style={[styles.actionBtnText, styles.acceptText]}>ACCEPT</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.hintText}>SWIPE OR PRESS TO CALIBRATE</Text>
                </View>
            </View>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    title: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 24,
        color: Colors.textH1,
    },
    counter: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 14,
        color: Colors.volt,
    },
    deckContainer: {
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
    },
    footer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        marginBottom: 20,
        width: '100%',
        justifyContent: 'center',
    },
    actionButton: {
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    discardBtn: {
        borderColor: '#444',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    acceptBtn: {
        borderColor: Colors.volt,
        backgroundColor: 'rgba(208, 253, 62, 0.1)',
    },
    actionBtnText: {
        fontFamily: 'Oswald_500Medium',
        fontSize: 14,
        color: '#888',
        letterSpacing: 1,
    },
    acceptText: {
        color: Colors.volt,
    },
    hintText: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 10,
        color: Colors.textBody,
    },
});
