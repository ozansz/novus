import { router } from 'expo-router';
import IntroSlide from '../../components/onboarding/IntroSlide';

export default function IntroFaceScreen() {
    return (
        <IntroSlide
            title="VISUAL ID"
            subtitle="FACIAL RECOGNITION"
            description="Enable advanced personalization. We analyze facial features to recommend frames, grooming styles, and color palettes. Your data is processed locally."
            confirmText="ENABLE SCAN"
            onConfirm={() => router.push('/onboarding/face-id')}
            secondaryText="SKIP IDENTIFICATION"
            onSecondary={() => router.push('/onboarding/processing')}
        />
    );
}
