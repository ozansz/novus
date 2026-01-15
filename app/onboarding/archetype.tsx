import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import ArchetypeCarousel from '../../components/onboarding/ArchetypeCarousel';
import Colors from '../../constants/Colors';
import { BuildArchetype, useNovusStore } from '../../stores/useNovusStore';

export default function ArchetypeScreen() {
    const { setArchetype } = useNovusStore();
    const [selected, setSelected] = useState<BuildArchetype>('Ectomorph');

    const handleConfirm = () => {
        setArchetype(selected);
        router.push('/onboarding/intro-face');
    };

    return (
        <ScreenLayout>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>SKELETAL FRAME</Text>
                    <Text style={styles.subtitle}>SELECT MATCHING ARCHETYPE.</Text>
                </View>

                <View style={styles.carouselContainer}>
                    <ArchetypeCarousel onSelect={setSelected} />
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                        <Text style={styles.buttonText}>[ CONFIRM BUILD ]</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        justifyContent: 'space-between',
    },
    header: {
        paddingHorizontal: 20,
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
    carouselContainer: {
        height: 500,
        justifyContent: 'center',
    },
    footer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: Colors.volt,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'Oswald_500Medium',
        fontSize: 16,
        color: Colors.deepBlack,
    }
});
