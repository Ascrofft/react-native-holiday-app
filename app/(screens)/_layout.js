import { Tabs } from 'expo-router';

const ScreenLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="Home" options={{ headerShown: false }} />
            <Tabs.Screen name="Settings" options={{ headerShown: false }} />
        </Tabs>
    );
};

export default ScreenLayout;