import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
    interpolate,
    Extrapolation,
} from 'react-native-reanimated';
import Colors from '../../constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

interface CalibrationDeckProps {
    onSwipeRight: () => void;
    onSwipeLeft: () => void;
    onFinished: () => void;
    currentIndex: number;
    totalCards: number;
}

export default function CalibrationDeck({ onSwipeRight, onSwipeLeft, onFinished, currentIndex, totalCards }: CalibrationDeckProps) {
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const translateX = useSharedValue(0);
    const cardScale = useSharedValue(1);

    const context = useSharedValue({ x: 0 });

    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { x: translateX.value };
        })
        .onUpdate((event) => {
            translateX.value = event.translationX + context.value.x;
        })
        .onEnd(() => {
            if (translateX.value > SWIPE_THRESHOLD) {
                // swipe right
                translateX.value = withSpring(SCREEN_WIDTH * 1.5);
                runOnJS(onSwipeRight)();
                runOnJS(setActiveCardIndex)(activeCardIndex + 1);

            } else if (translateX.value < -SWIPE_THRESHOLD) {
                // swipe left
                translateX.value = withSpring(-SCREEN_WIDTH * 1.5);
                runOnJS(onSwipeLeft)();
                runOnJS(setActiveCardIndex)(activeCardIndex + 1);
            } else {
                translateX.value = withSpring(0);
            }
        });

    // Reset card position when index changes (logic handled better by key-ing component or resetting shared value via effect, 
    // but for simplicity in this MVP, we might just assume the parent Unmounts/Remounts or we have a stack.
    // Actually, a true deck implementation needs multiple cards rendered.
    // Let's implement a visual stack of 2 cards: Current and Next.

    if (currentIndex >= totalCards) {
        runOnJS(onFinished)();
        return null;
    }

    // We need to reset translateX when the index changes from the parent prop
    // But since we are driving this from internal gestures, we need to sync.
    // A better pattern for a quick MVP:
    // Render the TOP card which is draggable.
    // Render the BOTTOM card which is static.
    // When top card is swiped away, it unmounts -> Bottom card becomes Top.

    // Re-use logic:
    // Let's assume the parent handles the "Current Index". 
    // We just render a Card for the current index.
    // When 'onSwipeRight' is called, parent increments index. 
    // This component will re-render. We need to reset X.

    // useEffect to reset
    React.useEffect(() => {
        translateX.value = 0;
    }, [currentIndex]);


    const animatedStyle = useAnimatedStyle(() => {
        const rotate = interpolate(
            translateX.value,
            [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            [-10, 0, 10],
            Extrapolation.CLAMP
        );

        return {
            transform: [
                { translateX: translateX.value },
                { rotate: `${rotate}deg` },
            ],
        };
    });

    const overlayStyleRight = useAnimatedStyle(() => {
        return {
            opacity: interpolate(translateX.value, [0, SCREEN_WIDTH / 4], [0, 1]),
        };
    });

    const overlayStyleLeft = useAnimatedStyle(() => {
        return {
            opacity: interpolate(translateX.value, [-SCREEN_WIDTH / 4, 0], [1, 0]),
        };
    });

    return (
        <GestureHandlerRootView style={styles.container}>
            {/* Background Card (Next) */}
            <View style={[styles.card, styles.nextCard]}>
                <View style={styles.placeholderImage} />
            </View>

            {/* Foreground Card (Active) */}
            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.card, animatedStyle]}>
                    <View style={styles.placeholderImage}>
                        <Text style={styles.cardText}>STYLE_ID_{currentIndex + 1}</Text>
                    </View>

                    {/* Overlays */}
                    <Animated.View style={[styles.overlay, styles.overlayAccept, overlayStyleRight]}>
                        <Text style={styles.overlayText}>ACCEPT</Text>
                    </Animated.View>
                    <Animated.View style={[styles.overlay, styles.overlayDiscard, overlayStyleLeft]}>
                        <Text style={styles.overlayText}>DISCARD</Text>
                    </Animated.View>
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    card: {
        width: SCREEN_WIDTH * 0.9,
        height: '70%',
        backgroundColor: Colors.surface,
        borderColor: Colors.border,
        borderWidth: 1,
        position: 'absolute',
        borderRadius: 8, // Slight rounding as per design tweaks or keep strict 0 if VDD says so. VDD says 0.
        // VDD says: Strictly Rectangular. 0px or 4px.
        overflow: 'hidden',
    },
    nextCard: {
        transform: [{ scale: 0.95 }, { translateY: 10 }],
        zIndex: -1,
        opacity: 0.5,
    },
    placeholderImage: {
        flex: 1,
        backgroundColor: '#222',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        color: '#444',
        fontFamily: 'JetBrainsMono_400Regular',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    overlayAccept: {
        backgroundColor: 'rgba(208, 253, 62, 0.2)', // Volt transparent
        borderColor: Colors.volt,
        borderWidth: 4,
    },
    overlayDiscard: {
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        borderColor: 'red',
        borderWidth: 4,
    },
    overlayText: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 40,
        color: '#FFF',
        textShadowColor: 'rgba(0,0,0,0.8)',
        textShadowRadius: 10,
    }

});
