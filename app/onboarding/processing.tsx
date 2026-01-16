import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import ScreenLayout from '../../components/ScreenLayout';
import Colors from '../../constants/Colors';

const SEQUENCE = [
    '> ESTABLISHING SECURE CONNECTION...',
    '> COMPILING VERTICAL & MASS METRICS...',
    '> MAPPING SKELETAL VECTORS...',
    '> ENCRYPTING BIOMETRIC DATA...',
    '> ALLOCATING 50 CREDITS...',
    '> SYSTEM READY.'
];

export default function ProcessingScreen() {
    const [lineIndex, setLineIndex] = useState(0);

    useEffect(() => {
        if (lineIndex < SEQUENCE.length) {
            const timeout = setTimeout(() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setLineIndex(prev => prev + 1);
            }, 800); // 800ms per line
            return () => clearTimeout(timeout);
        } else {
            // Finished
            const timeout = setTimeout(() => {
                router.replace('/onboarding/result');
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [lineIndex]);

    return (
        <ScreenLayout showHeader={false}>
            <View style={styles.container}>
                <View style={styles.terminal}>
                    {SEQUENCE.slice(0, lineIndex + 1).map((line, i) => (
                        <Text key={i} style={styles.line}>
                            {line}
                        </Text>
                    ))}
                    <View style={styles.cursor} />
                </View>
            </View>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    terminal: {
        gap: 10,
    },
    line: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 14,
        color: Colors.volt,
    },
    cursor: {
        width: 10,
        height: 18,
        backgroundColor: Colors.volt,
        marginTop: 10,
    }
});
