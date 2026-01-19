import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    type?: 'text' | 'style-card' | 'weather';
    data?: any; // For style cards or weather data
}

interface ChatInterfaceProps {
    messages: Message[];
    onSendMessage: (text: string) => void;
    onPressStyle?: (styleId: string) => void;
}

export default function ChatInterface({ messages, onSendMessage, onPressStyle }: ChatInterfaceProps) {
    const [inputText, setInputText] = React.useState('');
    const listRef = useRef<FlatList>(null);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
        }
    }, [messages]);

    const handleSend = () => {
        if (inputText.trim()) {
            onSendMessage(inputText.trim());
            setInputText('');
        }
    };

    const renderMessage = ({ item }: { item: Message }) => {
        const isUser = item.sender === 'user';

        if (item.type === 'style-card' && item.data) {
             return (
                <View style={[styles.messageRow, { justifyContent: 'flex-start' }]}>
                    <View style={[styles.bubble, styles.botBubble, { width: 200, padding: 0, overflow: 'hidden' }]}>
                        <View style={{ backgroundColor: '#222', height: 120, alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name="shirt-outline" size={40} color={Colors.volt} />
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={styles.cardTitle}>{item.data.name}</Text>
                            <Text style={styles.cardDesc}>{item.data.description}</Text>
                            <TouchableOpacity
                                style={styles.cardButton}
                                onPress={() => onPressStyle?.(item.data.id)}
                            >
                                <Text style={styles.cardButtonText}>VIEW DETAILS</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
             );
        }

        return (
            <View style={[styles.messageRow, { justifyContent: isUser ? 'flex-end' : 'flex-start' }]}>
                {!isUser && (
                    <View style={styles.avatar}>
                        <Ionicons name="hardware-chip-outline" size={16} color={Colors.deepBlack} />
                    </View>
                )}
                <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
                    <Text style={[styles.messageText, isUser ? styles.userText : styles.botText]}>{item.text}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={listRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
                contentContainerStyle={[styles.listContent, { paddingBottom: 100 }]} // Space for suggestions
                style={styles.list}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
                style={styles.inputContainer}
            >
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Ask about styles, weather, or events..."
                        placeholderTextColor="#666"
                        onSubmitEditing={handleSend}
                    />
                    <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                        <Ionicons name="arrow-up" size={20} color={Colors.deepBlack} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    messageRow: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'flex-end',
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: Colors.volt,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    bubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 16,
    },
    userBubble: {
        backgroundColor: Colors.volt,
        borderBottomRightRadius: 4,
    },
    botBubble: {
        backgroundColor: Colors.surface,
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    messageText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
    },
    userText: {
        color: Colors.deepBlack,
        fontFamily: 'Inter_500Medium',
    },
    botText: {
        color: Colors.textH1,
    },
    inputContainer: {
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        backgroundColor: Colors.deepBlack,
        padding: 10,
    },
    inputWrapper: {
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        borderRadius: 25,
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    input: {
        flex: 1,
        color: '#FFF',
        paddingHorizontal: 15,
        fontFamily: 'Inter_400Regular',
        height: 40,
    },
    sendButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.volt,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitle: {
        fontFamily: 'Oswald_500Medium',
        color: '#FFF',
        fontSize: 16,
        marginBottom: 4
    },
    cardDesc: {
        fontFamily: 'Inter_400Regular',
        color: '#888',
        fontSize: 12,
        marginBottom: 10
    },
    cardButton: {
        backgroundColor: Colors.volt,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 4
    },
    cardButtonText: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 12,
        color: Colors.deepBlack
    }
});
