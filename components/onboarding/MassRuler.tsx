import * as Haptics from 'expo-haptics';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';
import Colors from '../../constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = 10; // 10px per kg? No, maybe wider for precision.
// Let's say 20px per unit (Kg). 
const TICK_WIDTH = 2;
const GAP_WIDTH = 18; // Total 20px item width

const MIN_WEIGHT = 40;
const MAX_WEIGHT = 150;
const ITEM_COUNT = MAX_WEIGHT - MIN_WEIGHT + 1;
const ITEM_SIZE = 20;

interface MassRulerProps {
    initialValue: number;
    onValueChange: (val: number) => void;
}

export default function MassRuler({ initialValue, onValueChange }: MassRulerProps) {
    const scrollX = useSharedValue(0);

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
            <View style={styles.centerLine} />
            <Animated.ScrollView
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: '100%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    scroll: {
        flex: 1,
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
