import { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SIZES, COLORS, icons } from '../../../constants';
import { ScreenHeaderBtn, SettingItems } from '../../../components';

// Read Object Value
const readObjectValue = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
};

const Settings = () => {
    const router = useRouter();

    const [asyncStorage, setAsyncStorage] = useState();

    // Get and Set Address from AsyncStorage
    const getAsyncStorageData = async () => {
        const address = await readObjectValue("Address");
        setAsyncStorage(address);
        console.log("getAsyncStorageData DATA [SETTINGS] : ", asyncStorage);
    }

    useEffect(() => {
        getAsyncStorageData();
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
