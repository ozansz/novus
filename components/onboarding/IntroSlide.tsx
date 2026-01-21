import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import ScreenLayout from '../ScreenLayout';
import Colors from '../../constants/Colors';
import * as Haptics from 'expo-haptics';

interface IntroSlideProps {
    title: string;
    subtitle: string;
    description: string;
    onConfirm: () => void;
    confirmText: string;
    onSecondary?: () => void;
    secondaryText?: string;
}

export default function IntroSlide({
    title,
    subtitle,
    description,
    onConfirm,
    confirmText,
    onSecondary,
    secondaryText,
}: IntroSlideProps) {

    return (
        <ScreenLayout>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Animated.View entering={FadeInDown.delay(300).duration(800)}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subtitle}>{subtitle}</Text>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(600).duration(800)}>
                        <Text style={styles.description}>{description}</Text>
                    </Animated.View>
                </View>

                <View style={styles.footer}>
                    {onSecondary && secondaryText && (
                        <Animated.View entering={FadeInUp.delay(1100).duration(600)} style={{ width: '100%', marginBottom: 15 }}>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.button,
                                    styles.secondaryButton,
                                    pressed && { opacity: 0.7 }
                                ]}
                                onPress={() => {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                    onSecondary();
                                }}
                                accessibilityRole="button"
                                accessibilityLabel={secondaryText}
                                accessibilityHint="Navigates to the secondary option"
                            >
                                <Text style={[styles.buttonText, styles.secondaryButtonText]}>[ {secondaryText} ]</Text>
                            </Pressable>
                        </Animated.View>
                    )}

                    <Animated.View entering={FadeInUp.delay(900).duration(600)} style={{ width: '100%' }}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.button,
                                pressed && { opacity: 0.8 }
                            ]}
                            onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                                onConfirm();
                            }}
                            accessibilityRole="button"
                            accessibilityLabel={confirmText}
                            accessibilityHint="Proceeds to the next step"
                        >
                            <Text style={styles.buttonText}>[ {confirmText} ]</Text>
                        </Pressable>
                    </Animated.View>
                </View>
            </View>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 48,
        color: Colors.textH1,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    subtitle: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 14,
        color: Colors.volt,
        marginBottom: 30,
        letterSpacing: 1,
    },
    description: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: Colors.textBody,
        lineHeight: 24,
    },
    footer: {
        marginBottom: 40,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: Colors.volt,
        paddingVertical: 18,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.volt,
    },
    buttonText: {
        fontFamily: 'Oswald_500Medium',
        fontSize: 16,
        color: Colors.deepBlack,
        letterSpacing: 2,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderColor: Colors.border,
    },
    secondaryButtonText: {
        color: Colors.textBody,
    },
});
