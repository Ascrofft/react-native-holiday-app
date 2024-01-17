import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// import { useCallback } from 'react';
// import * as SplashScreen from 'expo-splash-screen';
// import { NavigationContainer } from '@react-navigation/native';

// SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const Layout = () => {
    const [fontsLoaded] = useFonts({
        DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
        DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
        DMRegular: require('../assets/fonts/DMSans-Regular.ttf')
    });

    // const onLayoutRootView = useCallback(async () => {
    //     if(fontsLoaded) {
    //         await SplashScreen.hideAsync();
    //     }
    // }, [fontsLoaded]);

    if(!fontsLoaded) return null;

    return (
        <QueryClientProvider client={queryClient}>
            <Stack>
                <Stack.Screen name="(screens)" options={{ headerShown: false }} />
            </Stack>
        </QueryClientProvider>
    );

    // return (
    //     <QueryClientProvider client={queryClient}>
    //         <Stack onLayout={onLayoutRootView} />
    //     </QueryClientProvider>
    // );

    // return (
    //     <NavigationContainer>

    //     </NavigationContainer>
    // );

    // return (
    //     <Stack>
    //         <Stack.Screen name="(screens)" options={{ headerShown: false }} />
    //     </Stack>
    // );
};

export default Layout;
