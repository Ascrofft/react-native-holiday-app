import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

import { icons } from '../../../../constants';
import styles from './HolidayCard.style';
import useFetch from '../../../../hook/useFetch';

const HolidayCard = ({vacation, handleNavigate}) => {
    const { data, isLoading, error } = useFetch();

    console.log("TEST2")

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

    // Format Dates
    // console.log(vacation.type);

    // Fn
    // let startdate = new Date(vacation.regions[0]?.startdate);
    // let enddate = new Date(vacation.regions[0].enddate);
    // let currentdate = new Date();

    // Return Card
    // if(enddate >= currentdate) {

    //     startdate = `${startdate.getDate()}-${startdate.getMonth() + 1}-${startdate.getFullYear()}`;
    //     enddate = `${enddate.getDate()}-${enddate.getMonth() + 1}-${enddate.getFullYear()}`;

        return (
            <TouchableOpacity style={styles.container} onPress={handleNavigate}>
                <TouchableOpacity style={styles.logoContainer}>
                    <Image
                        source={logo}
                        resizeMode="contain"
                        style={styles.logoImage}
                    />
                </TouchableOpacity>

                {isLoading ? (
                    <ActivityIndicator size="large" colors={COLORS.primary} />
                ) : error ? (
                    <Text>Er is iets mis gegaan. . .</Text>
                ) : (
                    <View style={styles.textContainer}>
                        <Text style={styles.vacationName} numberOfLines={1}>
                            {vacation.type.trim()}
                        </Text>
        
                        <Text style={styles.vacationDate}>Regio: {vacation.regions[0].region}</Text>
                        <Text style={styles.vacationDate}>Ingangsdatum: {startdate}</Text>
                        <Text style={styles.vacationDate}>Einddatum: {enddate}</Text>
                    </View>
                )}  
            </TouchableOpacity>
        );
    // } else {
    //     return (
    //         <Text></Text>
    //     );
    // }
};

export default HolidayCard;
