import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Colors from '../constants/Colors';

interface TabIconProps {
    name: React.ComponentProps<typeof Ionicons>['name'];
    focused: boolean;
}

export default function TabIcon({ name, focused }: TabIconProps) {
    const scale = useSharedValue(1);

    useEffect(() => {
        scale.value = withSpring(focused ? 1.2 : 1);
    }, [focused]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={animatedStyle}>
                <Ionicons
                    name={name}
                    size={24}
                    color={focused ? Colors.volt : Colors.textBody}
                />
            </Animated.View>
            {focused && <View style={styles.dot} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
    },
    dot: {
        position: 'absolute',
        bottom: 5,
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.volt,
    }
});
