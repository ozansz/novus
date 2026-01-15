import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import ScreenLayout from '../../components/ScreenLayout';
import CalibrationDeck from '../../components/onboarding/CalibrationDeck';
import Colors from '../../constants/Colors';
import { useNovusStore } from '../../stores/useNovusStore';

const TOTAL_CARDS = 10;

export default function CalibrationScreen() {
    const [index, setIndex] = useState(0);
    const { setStyleVector } = useNovusStore();

    const handleSwipeRight = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setIndex((prev) => prev + 1);
        // Logic: Add to style vector (positive reinforcement)
        // console.log('Accepted', index);
    };

    const handleSwipeLeft = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setIndex((prev) => prev + 1);
        // Logic: Ignore or negative reinforcement
        // console.log('Discarded', index);
    };

    const handleFinished = () => {
        router.push('/onboarding/height');
    };

    // If we exceeded cards, move on (handled by component or here)
    if (index >= TOTAL_CARDS) {
        handleFinished();
    }

    return (
        <ScreenLayout>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>CALIBRATE STYLE</Text>
                    <Text style={styles.counter}>IMG_0{index + 1} / {TOTAL_CARDS}</Text>
                </View>

                <View style={styles.deckContainer}>
                    <CalibrationDeck
                        currentIndex={index}
                        totalCards={TOTAL_CARDS}
                        onSwipeRight={handleSwipeRight}
                        onSwipeLeft={handleSwipeLeft}
                        onFinished={handleFinished}
                    />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.hintText}>SWIPE RIGHT TO ACCEPT // LEFT TO DISCARD</Text>
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
        marginBottom: 40,
    },
    footer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    hintText: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 10,
        color: Colors.textBody,
    },
});
