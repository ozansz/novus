import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    runOnJS,
    scrollTo,
    useAnimatedRef,
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';
import Colors from '../../constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = 10;
const ITEM_SIZE = 20;

const MIN_WEIGHT = 40;
const MAX_WEIGHT = 150;
const ITEM_COUNT = MAX_WEIGHT - MIN_WEIGHT + 1;

interface MassRulerProps {
    initialValue: number;
    onValueChange: (val: number) => void;
}

export default function MassRuler({ initialValue, onValueChange }: MassRulerProps) {
    const INITIAL_OFFSET = (initialValue - MIN_WEIGHT) * ITEM_SIZE;
    const scrollX = useSharedValue(INITIAL_OFFSET);
    const scrollRef = useAnimatedRef<Animated.ScrollView>();

    // Center offset
    const CENTER_OFFSET = SCREEN_WIDTH / 2;
    const SPACER_WIDTH = CENTER_OFFSET;

    const handleScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
        onMomentumEnd: (e) => {
            const index = Math.round(e.contentOffset.x / ITEM_SIZE);
            const value = MIN_WEIGHT + index;
            runOnJS(onValueChange)(value);
        }
    });

    const handleAdjust = (direction: 'increase' | 'decrease') => {
        const currentX = scrollX.value;
        const delta = direction === 'increase' ? ITEM_SIZE : -ITEM_SIZE;
        let targetX = currentX + delta;

        // Snap to grid
        targetX = Math.round(targetX / ITEM_SIZE) * ITEM_SIZE;

        // Clamp
        const maxOffset = (ITEM_COUNT - 1) * ITEM_SIZE;
        targetX = Math.max(0, Math.min(targetX, maxOffset));

        // We allow scrolling even if small diff to snap correctly
        if (Math.abs(targetX - currentX) > 0.1) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            scrollTo(scrollRef, targetX, 0, true);

            // Manually update value since onMomentumEnd might not fire for scrollTo
            const index = Math.round(targetX / ITEM_SIZE);
            const value = MIN_WEIGHT + index;
            onValueChange(value);
        }
    };

    const items = Array.from({ length: ITEM_COUNT }).map((_, i) => {
        const val = MIN_WEIGHT + i;
        const isMajor = val % 5 === 0;

        return (
            <View key={val} style={[styles.tickContainer, { width: ITEM_SIZE }]}>
                <View style={[styles.tick, isMajor ? styles.majorTick : styles.minorTick]} />
                {isMajor && <Text style={styles.tickLabel}>{val}</Text>}
            </View>
        );
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.adjustButton, styles.leftButton]}
                onPress={() => handleAdjust('decrease')}
                accessibilityLabel="Decrease weight"
                accessibilityRole="button"
            >
                <Feather name="minus" size={24} color={Colors.volt} />
            </TouchableOpacity>

            <View style={styles.centerLine} />
            <Animated.ScrollView
                ref={scrollRef}
                horizontal
                style={styles.scroll}
                contentContainerStyle={{
                    paddingHorizontal: SPACER_WIDTH,
                }}
                snapToInterval={ITEM_SIZE}
                decelerationRate="fast"
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                contentOffset={{ x: (initialValue - MIN_WEIGHT) * ITEM_SIZE, y: 0 }}
            >
                {items}
            </Animated.ScrollView>

            <TouchableOpacity
                style={[styles.adjustButton, styles.rightButton]}
                onPress={() => handleAdjust('increase')}
                accessibilityLabel="Increase weight"
                accessibilityRole="button"
            >
                <Feather name="plus" size={24} color={Colors.volt} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: '100%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        position: 'relative',
    },
    scroll: {
        flex: 1,
    },
    adjustButton: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
        backgroundColor: Colors.deepBlack, // Hides the ruler behind it
        opacity: 0.9,
    },
    leftButton: {
        left: 0,
    },
    rightButton: {
        right: 0,
    },
    tickContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start', // Ticks from top
        height: 100,
    },
    tick: {
        backgroundColor: Colors.border,
        marginTop: 10,
    },
    majorTick: {
        width: 2,
        height: 40,
        backgroundColor: Colors.volt,
    },
    minorTick: {
        width: 1,
        height: 20,
    },
    tickLabel: {
        color: '#666',
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 10,
        marginTop: 10,
        position: 'absolute',
        top: 50,
    },
    centerLine: {
        position: 'absolute',
        left: '50%',
        bottom: 0,
        top: 0,
        width: 2,
        backgroundColor: Colors.volt,
        zIndex: 10,
        height: 60, // Match tick area
        marginTop: 10,
    }
});
