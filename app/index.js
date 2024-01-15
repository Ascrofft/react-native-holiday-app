import { useState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { QueryClient } from '@tanstack/react-query';

import { COLORS, icons, images, SIZES } from '../constants';
import { ScreenHeaderBtn, Welcome, Holidays } from '../components';

const queryClient = new QueryClient();

const Home = () => {
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: COLORS.lightWhite
                }}
            >
                <Stack.Screen
                    options={{
                        headerStyle: {backgroundColor: COLORS.lightWhite},
                        headerShadowVisible: false,
                        headerRight: () => (
                            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                        ),
                        headerTitle: ""
                    }}
                />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            flex: 1,
                            padding: SIZES.medium
                        }}
                    >

                        <Welcome
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            handleClick={() => {
                                if(searchTerm) {
                                    router.push(`/search/${searchTerm}`);
                                }
                            }}
                        />

                        <Holidays />
                    </View>
                </ScrollView>
            
            </SafeAreaView>
    );
};

export default Home;