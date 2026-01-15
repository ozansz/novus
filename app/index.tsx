import { Redirect } from 'expo-router';

export default function Index() {
    // TODO: Check if onboarding is complete
    return <Redirect href="/onboarding/intro-mission" />;
}
