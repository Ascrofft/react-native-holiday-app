import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { icons } from '../../../../constants';
import styles from './HolidayCard.style';
import { COLORS, SIZES } from '../../../../constants';

// Read Async Storage Data
const readAsyncStorageData = async (key) => {
    try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
    console.log("readAsyncStorageData ERROR : ", e);
    }
};

const HolidayCard = ({vacation, handleNavigate}) => {

    const [region, setRegion] = useState();

    // Get Region from Async Storage
    const getRegion = async () => {
        const data = await readAsyncStorageData('Region');
        setRegion(data);
        // console.log("getRegion : ", region);
    };

    getRegion();
    // console.log("getRegion : ", region);

    // Set Logo
    switch(vacation.type.trim()) {
        case "Herfstvakantie":
            logo = icons.leaves;
            break;
        case "Kerstvakantie":
            logo = icons.snowflake;
            break;
        case "Voorjaarsvakantie":
            logo = icons.butterflies;
            break;
        case "Meivakantie":
            logo = icons.crocus;
            break;
        case "Zomervakantie":
            logo = icons.sun;
        break;
    }

    let vacationRegion = vacation?.regions[region] ? vacation?.regions[region] : vacation?.regions[0];

    // Format Dates
    let startdate = new Date(vacationRegion.startdate);
    let enddate = new Date(vacationRegion.enddate);
    let currentdate = new Date();

    // Return Card
    if(enddate >= currentdate) {

        startdate = `${startdate.getDate()}-${startdate.getMonth() + 1}-${startdate.getFullYear()}`;
        enddate = `${enddate.getDate()}-${enddate.getMonth() + 1}-${enddate.getFullYear()}`;

        return (
            <TouchableOpacity style={styles.container} onPress={handleNavigate}>
                <TouchableOpacity style={styles.logoContainer}>
                    <Image
                        source={logo}
                        resizeMode="contain"
                        style={styles.logoImage}
                    />
                </TouchableOpacity>

                <View style={styles.textContainer}>
                    <Text style={styles.vacationName} numberOfLines={1}>
                        {vacation.type.trim()}
                    </Text>

                    <Text style={styles.vacationDate}>Regio: {vacationRegion.region}</Text>
                    <Text style={styles.vacationDate}>Ingangsdatum: {startdate}</Text>
                    <Text style={styles.vacationDate}>Einddatum: {enddate}</Text>
                </View>
            </TouchableOpacity>
        );
    } else {
        return (
            <Text></Text>
        );
    }
};

export default HolidayCard;
