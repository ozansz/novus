import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import ScreenLayout from '../../components/ScreenLayout';
import VerticalRuler from '../../components/onboarding/VerticalRuler';
import Colors from '../../constants/Colors';
import { useNovusStore } from '../../stores/useNovusStore';

export default function HeightScreen() {
    const { setHeight, biometrics } = useNovusStore();
    const [currentHeight, setCurrentHeight] = useState(biometrics.height || 180);

    const handleValueChange = (val: number) => {
        if (val !== currentHeight) {
            setCurrentHeight(val);
            Haptics.selectionAsync(); // Tick on change
        }
    };

    const handleConfirm = () => {
        setHeight(currentHeight);
        router.push('/onboarding/weight');
    };

    return (
        <ScreenLayout>
            <View style={styles.container}>
                <View style={styles.leftContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>VERTICAL METRICS</Text>
                        <Text style={styles.subtitle}>CALIBRATE HEIGHT DATA.</Text>
                    </View>

                    <View style={styles.valueDisplay}>
                        <Text style={styles.valueText}>{currentHeight}</Text>
                        <Text style={styles.unitText}>CM</Text>
                    </View>

                    <View style={{ flex: 1 }} /> {/* Spacer */}

                    <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                        <Text style={styles.buttonText}>[ CONFIRM HEIGHT ]</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.rulerContainer}>
                    <VerticalRuler initialValue={currentHeight} onValueChange={handleValueChange} />
                </View>
            </View>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    leftContent: {
        flex: 1,
        padding: 20,
        paddingRight: 0,
        justifyContent: 'space-between',
    },
    rulerContainer: {
        width: 100,
        backgroundColor: 'transparent',
    },
    header: {
        marginTop: 20,
    },
    title: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 32,
        color: Colors.textH1,
        marginBottom: 4,
    },
    subtitle: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 12,
        color: Colors.textBody,
    },
    valueDisplay: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 60,
    },
    valueText: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 96,
        color: Colors.textH1,
    },
    unitText: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 20,
        color: Colors.volt,
        marginLeft: 10,
    },
    button: {
        backgroundColor: Colors.volt,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginRight: 20,
    },
    buttonText: {
        fontFamily: 'Oswald_500Medium',
        fontSize: 16,
        color: Colors.deepBlack,
    }

});
