import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import Colors from '../../constants/Colors';
import ChatInterface, { Message } from '../../components/Chat/ChatInterface';
import SuggestionGrid, { Suggestion } from '../../components/Chat/SuggestionGrid';
import { useCreditStore } from '../../stores/useCreditStore';
import * as Haptics from 'expo-haptics';

export default function LabScreen() {
    const { credits, deductCredits } = useCreditStore();
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Welcome to the Lab. I can help you generate styles based on your events or weather. Try "Generate style" or check suggestions below.', sender: 'bot' }
    ]);

    const [suggestions, setSuggestions] = useState<Suggestion[]>([
        { id: 's1', label: 'Check Weather', type: 'weather' },
        { id: 's2', label: 'Upcoming Event', type: 'event' },
        { id: 's3', label: 'Generate New Look', type: 'style' },
    ]);

    const handleSendMessage = (text: string) => {
        // Add user message
        const userMsg: Message = { id: Date.now().toString(), text, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);

        // Bot Logic
        setTimeout(() => {
            let botResponse: Message;
            const lowerText = text.toLowerCase();

            if (lowerText.includes('weather')) {
                botResponse = {
                    id: (Date.now() + 1).toString(),
                    text: 'Current weather in San Francisco: 65°F, Partly Cloudy. Suggesting light layers.',
                    sender: 'bot',
                    type: 'weather'
                };
            } else if (lowerText.includes('event') || lowerText.includes('calendar')) {
                 botResponse = {
                    id: (Date.now() + 1).toString(),
                    text: 'I found "Tech Conference" in your calendar. Here is a suitable style:',
                    sender: 'bot'
                };
                // Append a style card after
                setTimeout(() => {
                    const styleCard: Message = {
                        id: (Date.now() + 2).toString(),
                        text: '',
                        sender: 'bot',
                        type: 'style-card',
                        data: {
                            id: 'style_1',
                            name: 'TECH_MINIMALIST',
                            description: 'Smart casual for tech events. Breathable fabrics.'
                        }
                    };
                    setMessages(prev => [...prev, styleCard]);
                }, 500);

            } else if (lowerText.includes('generate') || lowerText.includes('style')) {
                 if (credits < 10) {
                     botResponse = {
                         id: (Date.now() + 1).toString(),
                         text: 'Insufficient credits. You need 10 credits to generate a new style.',
                         sender: 'bot'
                     };
                 } else {
                     botResponse = {
                        id: (Date.now() + 1).toString(),
                        text: 'Generating a new style based on your profile... (-10 credits)',
                        sender: 'bot'
                    };

                    // Simulate generation delay
                    setTimeout(() => {
                        deductCredits(10);
                        if (Platform.OS !== 'web') {
                            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                        }

                        const generatedStyle: Message = {
                            id: (Date.now() + 3).toString(),
                            text: '',
                            sender: 'bot',
                            type: 'style-card',
                            data: {
                                id: 'style_gen_' + Date.now(),
                                name: 'CUSTOM_GEN_01',
                                description: ' tailored to your measurements.'
                            }
                        };
                        setMessages(prev => [...prev, generatedStyle]);
                    }, 1500);
                 }

            } else {
                 botResponse = {
                    id: (Date.now() + 1).toString(),
                    text: 'I can help you with styles for specific events or weather conditions. Try asking "What should I wear for dinner?"',
                    sender: 'bot'
                };
            }

            setMessages(prev => [...prev, botResponse]);
        }, 600);
    };

    const handleSuggestionSelect = (suggestion: Suggestion) => {
        if (suggestion.type === 'weather') handleSendMessage('What is the weather?');
        if (suggestion.type === 'event') handleSendMessage('Style for my next event');
        if (suggestion.type === 'style') handleSendMessage('Generate a new style');
    };

    return (
        <ScreenLayout>
            <View style={styles.container}>
                 <View style={styles.header}>
                    <Text style={styles.title}>STYLE LAB</Text>
                    <Text style={styles.credits}>CREDITS: {credits}</Text>
                </View>

                <View style={{ flex: 1 }}>
                    <ChatInterface
                        messages={messages}
                        onSendMessage={handleSendMessage}
                    />
                </View>

                <View style={{ height: 120 }}>
                     <SuggestionGrid suggestions={suggestions} onSelect={handleSuggestionSelect} />
                </View>
            </View>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    title: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 20,
        color: Colors.textH1,
    },
    credits: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 12,
        color: Colors.volt,
    }
});
