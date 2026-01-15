import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import Colors from '../../constants/Colors';

const DATA = [
    { id: '1', title: 'TOKYO_DRIFT', loc: 'SHIBUYA', tags: ['STREET', 'TECH'], image: null },
    { id: '2', title: 'LONDON_FOG', loc: 'SOHO', tags: ['SUIT', 'WOOL'], image: null },
    { id: '3', title: 'NY_STATE', loc: 'BROOKLYN', tags: ['CASUAL', 'DENIM'], image: null },
    { id: '4', title: 'BERLIN_TECH', loc: 'KREUZBERG', tags: ['ALL_BLACK', 'MINIMAL'], image: null },
];

export default function FeedScreen() {
    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.card}>
            <View style={styles.imagePlaceholder}>
                <Text style={styles.placeholderText}>IMG_{item.id}</Text>
            </View>
            <View style={styles.overlay}>
                <View style={styles.metaRow}>
                    <Text style={styles.metaText}>{item.loc} // {item.tags[0]}</Text>
                    <View style={styles.simulateBtn}>
                        <Text style={styles.btnText}>SIM</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <ScreenLayout>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>INTEL FEED</Text>
                </View>
                <FlashList
                    data={DATA}
                    renderItem={renderItem}
                    // @ts-ignore
                    estimatedItemSize={400}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                />
            </View>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        marginTop: 20,
        marginBottom: 20,
    },
    title: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 24,
        color: Colors.textH1,
    },
    listContent: {
        paddingBottom: 100,
    },
    card: {
        height: 400,
        marginBottom: 20,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        overflow: 'hidden',
    },
    imagePlaceholder: {
        flex: 1,
        backgroundColor: '#222',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#444',
        fontFamily: 'Oswald_700Bold',
        fontSize: 24,
    },
    overlay: {
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.8)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    metaText: {
        fontFamily: 'JetBrainsMono_400Regular',
        color: '#FFF',
        fontSize: 12,
    },
    simulateBtn: {
        backgroundColor: Colors.volt,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    btnText: {
        fontFamily: 'Oswald_500Medium',
        color: Colors.deepBlack,
        fontSize: 10,
    }
});
