import { useState, useEffect } from 'react';
import { Text, View, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import * as Location from 'expo-location';
// https://www.youtube.com/watch?v=d7G0E_9FwyE

import { COLORS, icons, images, SIZES } from '../../../constants';
import { ScreenHeaderBtn, Welcome, Holidays } from '../../../components';

const Home = () => {
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState("");

    const [location, setLocation] = useState();
    const [address, setAddress] = useState("");

    useEffect(() => {
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            
            if(status !== 'granted') {
                //console.log("PERMISSION : DECLINED");
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            //console.log("LOCATION : ", currentLocation);
        };

        getPermissions();
    }, []);

    const geocode = async () => {
        const geocodedLocation = await Location.geocodeAsync(address);
        //console.log("GEOCODED LOCATION : ", geocodedLocation);
    };

    const reverseGeocode = async () => {
        const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
        });
        //console.log("REVERSED GEOCODED LOCATION : ", reverseGeocodedAddress);
    }

    //console.log("ADDRESS : ", address)

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
                    headerTitle: ""
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

                    {/* Location */}
                    <View
                        style={{
                            flex: 1,
                            padding: SIZES.medium
                        }}
                    >
                        <TextInput placeholder='Address' value={address} onChangeText={setAddress} />
                        <TouchableOpacity onPress={geocode}>
                            <Text>Geolocation Address</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={reverseGeocode}>
                            <Text>Reverse Geocode Current Location</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Holidays */}
                    <Holidays />   
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
