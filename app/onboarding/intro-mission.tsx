import { router } from 'expo-router';
import IntroSlide from '../../components/onboarding/IntroSlide';

export default function IntroMissionScreen() {
    return (
        <IntroSlide
            title="INITIATE"
            subtitle="SYSTEM INITIALIZATION"
            description="Select your primary objective to calibrate the optimization algorithm. Your choice defines the aesthetic parameters."
            confirmText="INITIALIZE"
            onConfirm={() => router.push('/onboarding/mission-select')}
        />
    );
}
