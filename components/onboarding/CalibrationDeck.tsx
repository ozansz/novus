import { Ionicons } from '@expo/vector-icons';
import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, ImageSourcePropType } from 'react-native';
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
    onFinished?: () => void;
    currentIndex: number;
    totalCards: number;
    images: { name: string; source: ImageSourcePropType }[];
}

export interface CalibrationDeckRef {
    swipeRight: () => void;
    swipeLeft: () => void;
}

const CalibrationDeck = forwardRef<CalibrationDeckRef, CalibrationDeckProps>(({ onSwipeRight, onSwipeLeft, onFinished, currentIndex, totalCards, images }, ref) => {
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const translateX = useSharedValue(0);

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
                translateX.value = withTiming(SCREEN_WIDTH * 1.5, { duration: 250 }, () => {
                    runOnJS(onSwipeRight)();
                });

            } else if (translateX.value < -SWIPE_THRESHOLD) {
                // swipe left
                translateX.value = withTiming(-SCREEN_WIDTH * 1.5, { duration: 250 }, () => {
                    runOnJS(onSwipeLeft)();
                });
            } else {
                translateX.value = withSpring(0);
            }
        });

    useImperativeHandle(ref, () => ({
        swipeRight: () => {
            if (currentIndex < totalCards) {
                translateX.value = withTiming(SCREEN_WIDTH * 1.5, { duration: 300 }, () => {
                    runOnJS(onSwipeRight)();
                });
            }
        },
        swipeLeft: () => {
            if (currentIndex < totalCards) {
                translateX.value = withTiming(-SCREEN_WIDTH * 1.5, { duration: 300 }, () => {
                    runOnJS(onSwipeLeft)();
                });
            }
        }
    }));

    // Reset card position when index changes
    useEffect(() => {
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

    if (currentIndex >= totalCards) {
        return (
            <View style={styles.container}>
                <Text style={styles.cardText}>CALIBRATION COMPLETE</Text>
            </View>
        );
    }

    const nextCardStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            Math.abs(translateX.value),
            [0, SCREEN_WIDTH],
            [0.95, 1],
            Extrapolation.CLAMP
        );
        const translateY = interpolate(
            Math.abs(translateX.value),
            [0, SCREEN_WIDTH],
            [20, 0],
            Extrapolation.CLAMP
        );
        const opacity = interpolate(
            Math.abs(translateX.value),
            [0, SCREEN_WIDTH],
            [0.5, 1],
            Extrapolation.CLAMP
        );

        return {
            transform: [{ scale }, { translateY }],
            opacity,
            zIndex: -1,
        };
    });

    // Get current and next images safely
    const currentImage = images[currentIndex];
    const nextImage = images[currentIndex + 1];

    return (
        <GestureHandlerRootView style={styles.container}>
            {/* Background Card (Next) */}
            {nextImage && (
                <Animated.View style={[styles.card, nextCardStyle]}>
                    <Image source={nextImage.source} style={styles.image} resizeMode="cover" />
                </Animated.View>
            )}

            {/* Foreground Card (Active) */}
            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.card, animatedStyle]}>
                    <Image source={currentImage?.source} style={styles.image} resizeMode="cover" />

                    {/* Style Label Overlay */}
                    <View style={styles.labelContainer}>
                        <Text style={styles.styleName}>{currentImage?.name || `STYLE_0${currentIndex}`}</Text>
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
});

export default CalibrationDeck;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    card: {
        width: SCREEN_WIDTH * 0.85,
        aspectRatio: 3 / 4,
        backgroundColor: Colors.surface,
        borderColor: Colors.border,
        borderWidth: 1,
        position: 'absolute',
        borderRadius: 2,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    labelContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    styleName: {
        color: '#FFF',
        fontFamily: 'Oswald_500Medium',
        fontSize: 16,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    cardText: {
        color: '#FFF',
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
