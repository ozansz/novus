import { router } from 'expo-router';
import IntroSlide from '../../components/onboarding/IntroSlide';

export default function IntroDataScreen() {
    return (
        <IntroSlide
            title="METRICS"
            subtitle="BIOMETRIC INPUT"
            description="Precision requires data. Input your physical statistics to generate accurate fit modeling and proportion analysis."
            confirmText="ENTER DATA"
            onConfirm={() => router.replace('/onboarding/height')}
        />
    );
}
