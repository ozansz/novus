import { Tabs } from 'expo-router';
import React from 'react';
import TabIcon from '../../components/TabIcon';
import Colors from '../../constants/Colors';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: Colors.deepBlack,
                    borderTopWidth: 1,
                    borderTopColor: Colors.border,
                    height: 80,
                    paddingTop: 10,
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: Colors.volt,
                tabBarInactiveTintColor: Colors.textBody,
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ focused }) => <TabIcon name="home-outline" focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="feed"
                options={{
                    tabBarIcon: ({ focused }) => <TabIcon name="telescope-outline" focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="lab"
                options={{
                    tabBarIcon: ({ focused }) => <TabIcon name="flask-outline" focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="logs"
                options={{
                    tabBarIcon: ({ focused }) => <TabIcon name="file-tray-full-outline" focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="id"
                options={{
                    tabBarIcon: ({ focused }) => <TabIcon name="id-card-outline" focused={focused} />,
                }}
            />
        </Tabs>
    );
}
