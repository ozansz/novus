import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';

interface ScreenLayoutProps {
    children: React.ReactNode;
    showHeader?: boolean; // For the SYS_READY bar
}

export default function ScreenLayout({ children, showHeader = true }: ScreenLayoutProps) {
    return (
        <SafeAreaView style={styles.container}>
            {/* Background Grid/Overlay Elements could go here */}

            {/* HUD: Top Status Bar */}
            {showHeader && (
                <View style={styles.headerBar}>
                    <View style={styles.statusDotRow}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>SYS_READY</Text>
                    </View>
                    <Text style={styles.versionText}>V.1.0</Text>
                </View>
            )}

            {/* HUD: Corner Crosshairs */}
            <View style={[styles.crosshair, styles.topLeft]}>
                <Text style={styles.crosshairText}>+</Text>
            </View>
            <View style={[styles.crosshair, styles.topRight]}>
                <Text style={styles.crosshairText}>+</Text>
            </View>
            <View style={[styles.crosshair, styles.bottomLeft]}>
                <Text style={styles.crosshairText}>+</Text>
            </View>
            <View style={[styles.crosshair, styles.bottomRight]}>
                <Text style={styles.crosshairText}>+</Text>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                {children}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.deepBlack,
    },
    content: {
        flex: 1,
        zIndex: 1,
    },
    headerBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        zIndex: 10,
    },
    statusDotRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.volt,
    },
    statusText: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 10,
        color: Colors.volt,
        letterSpacing: 1,
    },
    versionText: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 10,
        color: Colors.textBody,
    },
    crosshair: {
        position: 'absolute',
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
    },
    crosshairText: {
        color: Colors.border,
        fontSize: 20,
        fontWeight: '300', // Thin
    },
    topLeft: { top: 10, left: 10 },
    topRight: { top: 10, right: 10 },
    bottomLeft: { bottom: 10, left: 10 },
    bottomRight: { bottom: 10, right: 10 },
});
