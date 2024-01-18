import { useState, useEffect } from 'react';
import { Text, View, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS, icons, images, SIZES } from '../../../constants';
import { ScreenHeaderBtn, Welcome, Holidays } from '../../../components';
import { gemNoord, gemMidden, gemZuid } from '../../../data/subregions';

// Store String Data
const storeStringData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch(e) {
        console.log("storeStringData ERROR : ", e);
    }
};
// Store Object Data
const storeObjectData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch(e) {
        console.log("storeObjectData ERROR : ", e);
    }
};
// Read String Value
const readStringValue = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if(value !== null) {
            console.log("readStringValue DATA : ", value);
            return value;
        }
    } catch(e) {
        console.log("readStringValue ERROR : ", e);
    }
};
// Read Object Value
const readObjectValue = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
};

const Home = () => {
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState("");

    const [location, setLocation] = useState();
    const [address, setAddress] = useState();
    const [asyncStorage, setAsyncStorage] = useState();

    // Get and Set Address from AsyncStorage
    const getAsyncStorageData = async () => {
        const address = await readObjectValue("Address");
        setAsyncStorage(address);
        console.log("AsyncStorageData DATA [HOME] : ", asyncStorage);
    }

    // Address --> Location
    const geocode = async () => {
        let geocodedLocation = await Location.geocodeAsync(address);

        console.log("geocode GEOCODED LOCATION : ", geocodedLocation);

        let reverseGeocodedLocation = await Location.reverseGeocodeAsync({
            longitude: geocodedLocation[0].longitude,
            latitude: geocodedLocation[0].latitude
        });

        setAddress(reverseGeocodedLocation);
        
        console.log("geocode ADDRESS : ", address);
    };

    // Location --> Address
    const reverseGeocode = async () => {
        const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
        });
        console.log("REVERSED GEOCODED LOCATION : ", reverseGeocodedAddress);
    };

    useEffect(() => {
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            
            if(status !== 'granted') {
                console.log("PERMISSION : DECLINED");
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});

            setLocation(currentLocation);
            // console.log("getPermissions LOCATION : ", location);

            let reverseGeocodedAddress = await Location.reverseGeocodeAsync({
                longitude: currentLocation.coords.longitude,
                latitude: currentLocation.coords.latitude
            });

            setAddress(reverseGeocodedAddress);
            // cconsole.log("getPermissions ADDRESS : ", address);

            if(address !== undefined) storeObjectData("subregion", address);
        };
        
        getPermissions();
        getAsyncStorageData();
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.lightWhite,
            }}
        >
            {/* Header */}
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.menu}
                            dimension="60%"
                            handlePress={(() => { router.push('/Menu') })}
                        />
                    ),
                    headerTitle: `Locatie: ${asyncStorage ? asyncStorage?.city : '. . .'}`
                }}
            />

            {/* Main */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium
                    }}
                >
                    {/* Welcome */}
                    <Welcome
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleClick={() => {
                            if(searchTerm) {
                                router.push(`/search/${searchTerm}`);
                            }
                        }}
                    />

                    {/* <View
                        style={{
                            flex: 1,
                            padding: SIZES.medium
                        }}
                    >
                        <TextInput placeholder='Plaatsnaam' onChangeText={setAddress} />
                        <TouchableOpacity onPress={geocode}>
                            <Text>Geolocation Address</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={reverseGeocode}>
                            <Text>Reversed Geolocation Address</Text>
                        </TouchableOpacity>
                    </View> */}

                    {/* Holidays */}
                    <Holidays />   
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
