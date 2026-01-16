import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import ScreenLayout from '../../components/ScreenLayout';
import MassRuler from '../../components/onboarding/MassRuler';
import Colors from '../../constants/Colors';
import { useNovusStore } from '../../stores/useNovusStore';
import { shallow } from 'zustand/shallow';

export default function WeightScreen() {
    const { setWeight, weight } = useNovusStore(
        (state) => ({
            setWeight: state.setWeight,
            weight: state.biometrics.weight
        }),
        shallow
    );
    const [currentWeight, setCurrentWeight] = useState(weight || 75);

    const handleValueChange = (val: number) => {
        if (val !== currentWeight) {
            setCurrentWeight(val);
            Haptics.selectionAsync();
        }
    };

    const handleConfirm = () => {
        setWeight(currentWeight);
        router.replace('/onboarding/archetype');
    };

    return (
        <ScreenLayout>
            <View style={styles.container}>
                <View style={styles.topContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>MASS CALIBRATION</Text>
                        <Text style={styles.subtitle}>INPUT CURRENT BODY WEIGHT.</Text>
                    </View>

                    <View style={styles.valueDisplay}>
                        <Text style={styles.valueText}>{currentWeight}</Text>
                        <Text style={styles.unitText}>KG</Text>
                    </View>
                </View>

                <View style={styles.bottomContent}>
                    <View style={styles.rulerContainer}>
                        <MassRuler initialValue={currentWeight} onValueChange={handleValueChange} />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                        <Text style={styles.buttonText}>[ CONFIRM WEIGHT ]</Text>
                    </TouchableOpacity>
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
    topContent: {
        flex: 1,
    },
    bottomContent: {
        justifyContent: 'flex-end',
        paddingBottom: 20,
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
        alignSelf: 'center',
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
    rulerContainer: {
        height: 120,
        marginBottom: 30,
    },
    button: {
        backgroundColor: Colors.volt,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'Oswald_500Medium',
        fontSize: 16,
        color: Colors.deepBlack,
    }

});
