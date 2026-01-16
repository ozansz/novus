import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, SafeAreaView, Modal, TouchableWithoutFeedback } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Colors from '../../constants/Colors';
import { SeedStyles } from '../../constants/SeedStyles';
import { StyleImages } from '../../constants/StyleImages';
import ScreenLayout from '../../components/ScreenLayout';

const { width, height } = Dimensions.get('window');

export default function StyleDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<any>(null);

    const seedKey = typeof id === 'string' ? id : 'Techwear'; // Default fallback
    const styleData = SeedStyles.find(s => s.name === seedKey) || SeedStyles[0];
    const imageSource = StyleImages[seedKey] || StyleImages["Techwear"];

    const openImageModal = (image: any) => {
        setSelectedImage(image);
        setModalVisible(true);
    };

    const closeImageModal = () => {
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="share-outline" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="heart-outline" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <Image source={imageSource} style={styles.heroImage} resizeMode="cover" />

                <View style={styles.contentContainer}>
                    <Text style={[styles.title, { marginBottom: 20 }]}>{seedKey.toUpperCase()}</Text>

                    <View style={styles.section}>
                        <View style={styles.iconRow}>
                            <Ionicons name="pin-outline" size={24} color="#FFF" />
                            <View style={styles.iconTextContainer}>
                                <Text style={styles.sectionHeader}>Occasion</Text>
                                <Text style={styles.sectionBody}>
                                    {styleData.scenario}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.iconRow, { marginTop: 20 }]}>
                            <Ionicons name="pricetag-outline" size={24} color="#FFF" />
                            <View style={styles.iconTextContainer}>
                                <Text style={styles.sectionHeader}>Atmosphere</Text>
                                <Text style={styles.sectionBody}>
                                    {styleData.vibe_tags.map(tag => tag.toUpperCase()).join(' • ')}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.iconRow, { marginTop: 20 }]}>
                            <Ionicons name="shirt-outline" size={24} color="#FFF" />
                            <View style={styles.iconTextContainer}>
                                <Text style={styles.sectionHeader}>Look Blueprint</Text>
                                <View style={styles.garmentList}>
                                    {styleData.items?.map((item, index) => (
                                        <View key={index} style={styles.garmentRow}>
                                            <TouchableOpacity onPress={() => openImageModal(styleData.item_images?.[index])} testID="garment-thumbnail">
                                                <Image
                                                    source={styleData.item_images?.[index]}
                                                    style={styles.garmentThumbnail}
                                                    resizeMode="cover"
                                                />
                                            </TouchableOpacity>
                                            <Text style={styles.garmentText}>
                                                {item}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.hostRow}>
                        <View style={styles.avatarContainer}>
                            <Ionicons name="cube-outline" size={24} color={Colors.volt} />
                        </View>
                        <View>
                            <Text style={styles.hostTitle}>Curated by NOVUS AI</Text>
                            <Text style={styles.hostSubtitle}>System Intelligence</Text>
                        </View>
                    </View>

                    <View style={{ height: 20 }} />
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <View>
                    <Text style={styles.price}>5 CREDITS</Text>
                    <Text style={styles.priceSubtitle}>Single Simulation</Text>
                </View>
                <TouchableOpacity style={styles.reserveButton}>
                    <Text style={styles.reserveButtonText}>SIMULATE ON ME</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeImageModal}
            >
                <TouchableWithoutFeedback onPress={closeImageModal}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <Animated.View
                                entering={FadeInDown.duration(400)}
                                style={styles.modalContent}
                            >
                                {selectedImage && (
                                    <Image
                                        source={selectedImage}
                                        style={styles.fullScreenImage}
                                        resizeMode="contain"
                                        testID="modal-image"
                                    />
                                )}
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.deepBlack,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenImage: {
        width: '90%',
        height: '100%',
    },
    header: {
        position: 'absolute',
        top: 80,
        left: 0,
        right: 0,
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)', // Transparent dark
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerActions: {
        flexDirection: 'row',
    },
    actionButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    heroImage: {
        width: width,
        height: height * 0.5,
    },
    contentContainer: {
        padding: 24,
    },
    title: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 28,
        color: '#FFF',
        marginBottom: 8,
    },
    subtitle: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 14,
        color: '#BBB',
        lineHeight: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#333',
        marginVertical: 24,
    },
    hostRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#1A1A1A',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    hostTitle: {
        fontFamily: 'Oswald_500Medium',
        fontSize: 16,
        color: '#FFF',
    },
    hostSubtitle: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 12,
        color: '#888',
    },
    section: {
        // 
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    iconTextContainer: {
        marginLeft: 16,
        flex: 1,
    },
    sectionHeader: {
        fontFamily: 'Oswald_500Medium',
        fontSize: 16,
        color: '#FFF',
        marginBottom: 4,
    },
    sectionBody: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 12,
        color: '#BBB',
        lineHeight: 18,
    },
    garmentList: {
        marginTop: 8,
    },
    garmentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    garmentThumbnail: {
        width: 80,
        height: 80,
        borderRadius: 4,
        marginRight: 12,
        backgroundColor: '#333',
    },
    garmentText: {
        flex: 1,
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 12,
        color: '#DDD',
    },
    description: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 14,
        color: '#DDD',
        lineHeight: 22,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.deepBlack,
        borderTopWidth: 1,
        borderTopColor: '#333',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 40, // Safe area
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 18,
        color: '#FFF',
    },
    priceSubtitle: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 12,
        color: '#888',
    },
    reserveButton: {
        backgroundColor: Colors.volt,
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 8,
    },
    reserveButtonText: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 16,
        color: Colors.deepBlack,
    }
});
