import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';
import Colors from '../../constants/Colors';
import { BuildArchetype } from '../../stores/useNovusStore';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.7;
const SPACING = 20;
const SNAP_INTERVAL = CARD_WIDTH + SPACING;
const PAGE_WIDTH = SNAP_INTERVAL;

// Padding to center the first item
const PADDING_HORIZONTAL = (SCREEN_WIDTH - CARD_WIDTH) / 2 - SPACING / 2;

const ARCHETYPES: { type: BuildArchetype; title: string; desc: string }[] = [
    { type: 'Ectomorph', title: 'ECTOMORPH', desc: 'Lean build, narrow shoulders, fast metabolism.' },
    { type: 'Mesomorph', title: 'MESOMORPH', desc: 'Athletic, high muscle mass, rectangular frame.' },
    { type: 'Endomorph', title: 'ENDOMORPH', desc: 'Broad build, stocky, slower metabolism.' },
    { type: 'Frame_XL', title: 'FRAME_XL', desc: 'Heavy build, broad shoulders, maximum presence.' },
];

interface ArchetypeCarouselProps {
    onSelect: (type: BuildArchetype) => void;
}

export default function ArchetypeCarousel({ onSelect }: ArchetypeCarouselProps) {
    const scrollX = useSharedValue(0);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
        onMomentumEnd: (event) => {
            const index = Math.round(event.contentOffset.x / PAGE_WIDTH);
            if (ARCHETYPES[index]) {
                // runOnJS(setActiveIndex)(index); // No need to track state heavily if we use onSelect
                // But we might want to highlight selection.
            }
        }
    });

    // We need to know when selection stops to trigger "onSelect" for the confirm button context?
    // Or just let user scroll and hit confirm component-side?
    // Component props says "onSelect".

    // Actually, let's just expose the index and let parent handle confirmation logic via a "Confirm" button that reads the current index?
    // Or pass the selected type UP whenever it settles.

    const onMomentumScrollEnd = (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / PAGE_WIDTH);
        const safeIndex = Math.max(0, Math.min(index, ARCHETYPES.length - 1));
        setActiveIndex(safeIndex);
        onSelect(ARCHETYPES[safeIndex].type);
    };

    return (
        <Animated.ScrollView
            horizontal
            style={styles.scroll}
            contentContainerStyle={{
                paddingHorizontal: PADDING_HORIZONTAL,
                alignItems: 'center',
            }}
            snapToInterval={SNAP_INTERVAL}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            onMomentumScrollEnd={onMomentumScrollEnd}
        >
            {ARCHETYPES.map((item, index) => {
                const isSelected = index === activeIndex;
                return (
                    <View key={item.type} style={[styles.cardContainer, { width: CARD_WIDTH, marginRight: SPACING }]}>
                        <View style={[styles.card, isSelected && styles.activeCard]}>
                            <View style={styles.imagePlaceholder}>
                                {/* Wireframe Image would go here */}
                            </View>
                            <View style={styles.info}>
                                <Text style={[styles.title, isSelected && styles.activeTitle]}>{item.title}</Text>
                                <Text style={styles.desc}>{item.desc}</Text>
                            </View>
                        </View>
                    </View>
                );
            })}
        </Animated.ScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: {
        flexGrow: 0,
        height: 500,
    },
    cardContainer: {
        height: '100%',
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        backgroundColor: Colors.surface,
        borderColor: Colors.border,
        borderWidth: 1,
        padding: 20,
        justifyContent: 'flex-end',
        opacity: 0.5,
    },
    activeCard: {
        borderColor: Colors.volt,
        borderWidth: 2,
        opacity: 1,
        transform: [{ scale: 1.05 }]
    },
    imagePlaceholder: {
        flex: 1,
        backgroundColor: '#222',
        marginBottom: 20,
    },
    info: {
        height: 100,
    },
    title: {
        fontFamily: 'Oswald_700Bold',
        fontSize: 24,
        color: '#666',
        marginBottom: 8,
    },
    activeTitle: {
        color: Colors.textH1,
    },
    desc: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 12,
        color: Colors.textBody,
    }
});
