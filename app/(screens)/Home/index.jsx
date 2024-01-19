import { useState, useEffect } from 'react';
import { Text, View, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS, icons, SIZES } from '../../../constants';
import { ScreenHeaderBtn, Welcome, Holidays } from '../../../components';

// Store Object Data
const storeObjectData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch(e) {
        console.log("storeObjectData ERROR : ", e);
    }
};
// Read Object Value
const readAsyncStorageData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
};

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

const Home = () => {
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState("");

    const [location, setLocation] = useState();
    const [address, setAddress] = useState();
    const [asyncStorage, setAsyncStorage] = useState();

    // Get and Set Address from AsyncStorage
    const getAddress = async () => {
        const data = await readAsyncStorageData("Address");
        setAsyncStorage(data);
        console.log("AsyncStorageData DATA [HOME] : ", asyncStorage);
    }
    
    useEffect(() => {
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            
            if(status !== 'granted') {
                console.log("PERMISSION : DECLINED");
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});

            setLocation(currentLocation);
            console.log("getPermissions LOCATION : ", location);

            let reverseGeocodedAddress = await Location.reverseGeocodeAsync({
                longitude: currentLocation.coords.longitude,
                latitude: currentLocation.coords.latitude
            });

            setAddress(reverseGeocodedAddress);
            console.log("getPermissions ADDRESS : ", address);

            if(address) storeObjectData("Address", address);
        };
        
        getPermissions();
        getAddress();
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
                    headerTitle: `Locatie: ${asyncStorage ? asyncStorage[0]?.city : '. . .'}`
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
