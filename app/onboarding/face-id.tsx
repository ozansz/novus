import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as Haptics from 'expo-haptics';
import ScreenLayout from '../../components/ScreenLayout';
import Colors from '../../constants/Colors';
import { useNovusStore } from '../../stores/useNovusStore';

export default function FaceIdScreen() {
    const setFaceData = useNovusStore((state) => state.setFaceData);
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState<string | null>(null);
    const cameraRef = useRef<CameraView>(null);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <ScreenLayout>
                <View style={styles.container}>
                    <Text style={styles.message}>We need your permission to show the camera</Text>
                    <TouchableOpacity style={styles.button} onPress={requestPermission}>
                        <Text style={styles.buttonText}>GRANT PERMISSION</Text>
                    </TouchableOpacity>
                </View>
            </ScreenLayout>
        );
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            try {
                const photo = await cameraRef.current.takePictureAsync();
                if (photo) {
                    setPhoto(photo.uri);
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleConfirm = () => {
        setFaceData(photo);
        router.replace('/onboarding/processing');
    };

    const handleSkip = () => {
        setFaceData(null);
        router.replace('/onboarding/processing');
    };

    const handleRetake = () => {
        setPhoto(null);
    };

    return (
        <ScreenLayout>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>BIOMETRIC SCAN</Text>
                    <Text style={styles.subtitle}>REQUIRED FOR FACE-SWAP SIMULATIONS.</Text>
                </View>

                <View style={styles.cameraContainer}>
                    {photo ? (
                        <Image source={{ uri: photo }} style={styles.camera} />
                    ) : (
                        <CameraView style={styles.camera} facing="front" ref={cameraRef}>
                            <View style={styles.overlay}>
                                <View style={styles.cornerTL} />
                                <View style={styles.cornerTR} />
                                <View style={styles.cornerBL} />
                                <View style={styles.cornerBR} />
                                <Text style={styles.overlayText}>ALIGN EYES TO GRID</Text>
                            </View>
                        </CameraView>
                    )}
                </View>

                <View style={styles.footer}>
                    {photo ? (
                        <View>
                            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                                <Text style={styles.buttonText}>[ CONFIRM SCAN ]</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.secondaryButton} onPress={handleRetake}>
                                <Text style={styles.secondaryButtonText}>RETAKE</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View>
                            <TouchableOpacity style={styles.button} onPress={takePicture}>
                                <Text style={styles.buttonText}>[ CAPTURE ]</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.secondaryButton} onPress={handleSkip}>
                                <Text style={styles.secondaryButtonText}>{'> SKIP BIOMETRIC PROTOCOL'}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
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
    message: {
        textAlign: 'center',
        paddingBottom: 10,
        color: Colors.textBody,
        fontFamily: 'JetBrainsMono_400Regular',
    },
    cameraContainer: {
        flex: 1,
        marginVertical: 20,
        borderRadius: 1, // Sharp corners
        borderWidth: 1,
        borderColor: Colors.border,
        overflow: 'hidden',
    },
    camera: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 40,
    },
    overlayText: {
        color: Colors.volt,
        fontFamily: 'JetBrainsMono_400Regular',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 4,
    },
    cornerTL: { position: 'absolute', top: 0, left: 0, width: 20, height: 20, borderColor: Colors.volt, borderTopWidth: 2, borderLeftWidth: 2 },
    cornerTR: { position: 'absolute', top: 0, right: 0, width: 20, height: 20, borderColor: Colors.volt, borderTopWidth: 2, borderRightWidth: 2 },
    cornerBL: { position: 'absolute', bottom: 0, left: 0, width: 20, height: 20, borderColor: Colors.volt, borderBottomWidth: 2, borderLeftWidth: 2 },
    cornerBR: { position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderColor: Colors.volt, borderBottomWidth: 2, borderRightWidth: 2 },

    footer: {
        marginBottom: 20,
    },
    button: {
        backgroundColor: Colors.volt,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    buttonText: {
        fontFamily: 'Oswald_500Medium',
        fontSize: 16,
        color: Colors.deepBlack,
    },
    secondaryButton: {
        alignItems: 'center',
        padding: 10,
    },
    secondaryButtonText: {
        fontFamily: 'JetBrainsMono_400Regular',
        color: '#666',
        fontSize: 12,
    }
});
