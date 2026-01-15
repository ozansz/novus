import * as Haptics from 'expo-haptics';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedScrollHandler,
    useSharedValue,
    withDecay,
} from 'react-native-reanimated';
import Colors from '../../constants/Colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const ITEM_HEIGHT = 10; // 10px per cm
const MIN_HEIGHT = 120;
const MAX_HEIGHT = 220;
const ITEM_COUNT = MAX_HEIGHT - MIN_HEIGHT + 1;
const SNAP_INTERVAL = ITEM_HEIGHT;

interface VerticalRulerProps {
    initialValue: number;
    onValueChange: (val: number) => void;
}

export default function VerticalRuler({ initialValue, onValueChange }: VerticalRulerProps) {
    const scrollY = useSharedValue(0);

    // We want the ruler to start at initialValue.
    // The scroll offset for value V is (MAX - V) * ITEM_HEIGHT
    // Wait, let's render from MAX to MIN (top to bottom).
    // Top: 220, Bottom: 120.
    // Scroll 0 => 220.

    // Actually, standard list is top-to-bottom indices 0...N.
    // Index 0: 220
    // Index 1: 219
    // ...
    // Index N: 120

    // Calculate initial scroll.
    // initialValue (e.g. 180) -> Index (220 - 180) = 40.
    // ScrollY = 40 * 10 = 400.

    // We need to pad the list so the center of the list hits the center of the screen.

    const CENTER_OFFSET = SCREEN_HEIGHT / 2;
    const SPACER_HEIGHT = CENTER_OFFSET;

    const handleScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;

            const index = Math.round(event.contentOffset.y / ITEM_HEIGHT);
            const value = MAX_HEIGHT - index;

            // Debounce or just call? Calling JS on every frame is bad?
            // Reanimated generic "runOnJS" is fine if not too heavy.
            // But haptics on every item?

            // Let's tracking integer changes.
            // We can use a derived value or simple logic.
        },
        onMomentumEnd: (e) => {
            // Snap logic if needed, or rely on snapToInterval
            const index = Math.round(e.contentOffset.y / ITEM_HEIGHT);
            const value = MAX_HEIGHT - index;
            runOnJS(onValueChange)(value);
        }
    });

    // Haptics logic in JS land via listener or useDerivedValue?
    // Let's use simple onScroll listener in the component if we can.
    // Actually, `useAnimatedReaction` is best.

    // ... omitting complex Reanimated haptics logic for brevity, 
    // relying on `onMomentumScrollEnd` or `onScroll` event from native if possible.
    // But standard OnScroll is noisy.

    // Let's pass a ScrollView ref.

    // Render Items
    const items = Array.from({ length: ITEM_COUNT }).map((_, i) => {
        const val = MAX_HEIGHT - i;
        const isMajor = val % 5 === 0;
        return (
            <View key={val} style={[styles.tickContainer, { height: ITEM_HEIGHT }]}>
                <View style={[styles.tick, isMajor ? styles.majorTick : styles.minorTick]} />
                {isMajor && <Text style={styles.tickLabel}>{val}</Text>}
            </View>
        );
    });

    return (
        <View style={styles.container}>
            <View style={styles.centerLine} />
            <Animated.ScrollView
                style={styles.scroll}
                contentContainerStyle={{
                    paddingTop: SPACER_HEIGHT,
                    paddingBottom: SPACER_HEIGHT,
                }}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                // Initial offset... ScrollView doesn't support contentOffset prop easily with Reanimated sometimes without ref.
                // We'll use contentOffset prop if standard RN ScrollView allows it (it does).
                contentOffset={{ x: 0, y: (MAX_HEIGHT - initialValue) * ITEM_HEIGHT }}
            >
                {items}
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 100, // Fixed width on right side
        alignSelf: 'flex-end',
        backgroundColor: 'transparent',
    },
    scroll: {
        flex: 1,
    },
    tickContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 20,
    },
    tick: {
        backgroundColor: Colors.border,
    },
    majorTick: {
        width: 40,
        height: 2,
        backgroundColor: Colors.volt, // Highlight major ticks
    },
    minorTick: {
        width: 20,
        height: 1,
    },
    tickLabel: {
        color: '#666',
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 10,
        marginRight: 10,
        position: 'absolute',
        right: 50,
    },
    centerLine: {
        position: 'absolute',
        top: '50%',
        width: '100%',
        height: 2,
        backgroundColor: Colors.volt,
        zIndex: 10,
        right: 0,
    }
});
