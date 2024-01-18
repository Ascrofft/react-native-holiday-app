import { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SIZES, COLORS, icons } from '../../../constants';
import { ScreenHeaderBtn, SettingItems } from '../../../components';

// Read Async Storage Data
const readAsyncStorageData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log("readAsyncStorageData ERROR : ", e);
    }
};

const Settings = () => {
    const router = useRouter();

    const [asyncStorage, setAsyncStorage] = useState();

    // Get and Set Address from AsyncStorage
    const getAsyncStorageData = async (key) => {
        const data = await readAsyncStorageData(key);
        setAsyncStorage(data);
        console.log("getAsyncStorageData DATA [SETTINGS] : ", asyncStorage);
    }

    useEffect(() => {
        getAsyncStorageData("Address");
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.lightWhite
            }}
        >
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={ icons.menu }
                            dimension="60%"
                            handlePress={(() => { router.push('/Menu') })}
                        />
                    ),
                    headerTitle: `Locatie: ${asyncStorage ? asyncStorage?.city : '. . .'}`
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium
                    }}
                >
                    <SettingItems />
                </View>
            </ScrollView>
        </SafeAreaView>        
    );
};

export default Settings;
