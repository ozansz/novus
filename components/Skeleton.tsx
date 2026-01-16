import React, { useEffect } from 'react';
import { StyleSheet, ViewStyle, DimensionValue, View } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';

interface SkeletonProps {
    width: DimensionValue;
    height: DimensionValue;
    style?: ViewStyle;
    borderRadius?: number;
}

export default function Skeleton({ width, height, style, borderRadius = 4 }: SkeletonProps) {
    const opacity = useSharedValue(0.3);

    useEffect(() => {
        opacity.value = withRepeat(
            withTiming(0.8, { duration: 1000 }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    return (
        <Animated.View
            style={[
                styles.container,
                { width, height, borderRadius },
                style,
                animatedStyle,
            ]}
        >
            <LinearGradient
                colors={[Colors.surface, '#333333', Colors.surface]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: Colors.surface,
    },
    gradient: {
        flex: 1,
    },
});
