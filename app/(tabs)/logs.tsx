import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const LOGS_DATA = [
    { id: '101', date: '2023.10.24', protocol: 'DATE_NIGHT', status: 'COMPLETE' },
    { id: '102', date: '2023.10.22', protocol: 'BOARDROOM', status: 'COMPLETE' },
    { id: '103', date: '2023.10.15', protocol: 'NIGHT_OPS', status: 'ARCHIVED' },
];

export default function LogsScreen() {
    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.logItem}>
            <View style={styles.logLeft}>
                <View style={[styles.statusDot, item.status === 'COMPLETE' ? styles.dotGreen : styles.dotGrey]} />
                <View>
                    <Text style={styles.logProtocol}>{item.protocol}</Text>
                    <Text style={styles.logDate}>{item.date}</Text>
                </View>
            </View>
            <View style={styles.logRight}>
                <Ionicons name="chevron-forward" size={16} color={Colors.textBody} />
            </View>
        </TouchableOpacity>
    );

    return (
        <ScreenLayout>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>MISSION LOGS</Text>
                </View>

                <FlatList
                    data={LOGS_DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
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
    list: {
        paddingBottom: 20,
    },
    logItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    logLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    dotGreen: {
        backgroundColor: Colors.volt,
    },
    dotGrey: {
        backgroundColor: '#444',
    },
    logProtocol: {
        fontFamily: 'Oswald_500Medium',
        fontSize: 16,
        color: '#FFF',
        marginBottom: 2,
    },
    logDate: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 12,
        color: '#666',
    },
    logRight: {
        opacity: 0.5,
    }
});
