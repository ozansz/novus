import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Platform, Alert, Button } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import Colors from '../../constants/Colors';
import TimelineCard from '../../components/TimelineCard';
import * as Calendar from 'expo-calendar';

interface Event {
    id: string;
    title: string;
    startDate: Date;
    endDate: Date;
    location?: string;
    notes?: string;
    isMock?: boolean;
}

export default function LogsScreen() {
    const [events, setEvents] = useState<Event[]>([]);
    const [hasPermission, setHasPermission] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            if (Platform.OS === 'web') {
                // Mock data for Web
                setEvents([
                    {
                        id: '1',
                        title: 'Tech Conference 2023',
                        startDate: new Date(new Date().setHours(9, 0, 0, 0)),
                        endDate: new Date(new Date().setHours(17, 0, 0, 0)),
                        location: 'Moscone Center, SF',
                        notes: 'Keynote speech about AI in Fashion.',
                        isMock: true
                    },
                    {
                        id: '2',
                        title: 'Team Dinner',
                        startDate: new Date(new Date().setHours(19, 30, 0, 0)),
                        endDate: new Date(new Date().setHours(21, 30, 0, 0)),
                        location: 'Nobu, Palo Alto',
                        notes: 'Smart casual attire required.',
                        isMock: true
                    },
                    {
                        id: '3',
                        title: 'Morning Run',
                        startDate: new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
                        endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
                        location: 'Central Park',
                        notes: 'Training for marathon.',
                        isMock: true
                    }
                ]);
                return;
            }

            // Native: Request permissions
            const { status } = await Calendar.requestCalendarPermissionsAsync();
            if (status === 'granted') {
                setHasPermission(true);
                const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
                const calendarIds = calendars.map(c => c.id);
                const startDate = new Date();
                const endDate = new Date();
                endDate.setDate(endDate.getDate() + 7); // Next 7 days

                const fetchedEvents = await Calendar.getEventsAsync(calendarIds, startDate, endDate);

                // Sort by date
                const sortedEvents = fetchedEvents.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

                setEvents(sortedEvents.map(e => ({
                    id: e.id,
                    title: e.title,
                    startDate: new Date(e.startDate),
                    endDate: new Date(e.endDate),
                    location: e.location,
                    notes: e.notes
                })));
            } else {
                Alert.alert('Permission needed', 'We need access to your calendar to generate style suggestions based on your schedule.');
            }
        })();
    }, []);

    const renderItem = ({ item }: { item: Event }) => (
        <TimelineCard
            title={item.title}
            startDate={item.startDate}
            endDate={item.endDate}
            location={item.location}
            description={item.notes}
            isMock={item.isMock}
        />
    );

    return (
        <ScreenLayout>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>TIMELINE</Text>
                    <Text style={styles.subtitle}>UPCOMING OPERATIONS</Text>
                </View>

                {events.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No events found.</Text>
                        {!hasPermission && Platform.OS !== 'web' && (
                            <Text style={styles.permissionHint}>Check permissions settings.</Text>
                        )}
                    </View>
                ) : (
                    <FlatList
                        data={events}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.list}
                        showsVerticalScrollIndicator={false}
                    />
                )}
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
    subtitle: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 12,
        color: Colors.volt,
        marginTop: 5,
    },
    list: {
        paddingBottom: 20,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontFamily: 'JetBrainsMono_400Regular',
        color: Colors.textBody,
    },
    permissionHint: {
        fontFamily: 'JetBrainsMono_400Regular',
        color: Colors.textBody,
        marginTop: 10,
        fontSize: 12
    }
});
