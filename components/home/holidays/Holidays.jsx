import { useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './Holidays.style';
import { COLORS, SIZES } from '../../../constants';
import HolidayCard from '../../common/cards/holidays/HolidayCard';
import useFetch from '../../../hook/useFetch';

const Holidays = () => {
    const router = useRouter();
    const { data, isLoading, error } = useFetch();    

    return (
        <View style={styles.container}>
            {console.log("TEST1")}
            <View style={styles.header}>
                {isLoading ? (
                    <ActivityIndicator size="large" colors={COLORS.primary} />
                ) : error ? (
                    <Text>Er is iets fout gegaan. . .</Text>
                ) : (
                    <Text style={styles.headerTitle}>{data.content[0].schoolyear.trim()}</Text>
                )}
            </View>
            
            {console.log("TEST3")}
            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" colors={COLORS.primary} />
                ) : error ? (
                    <Text>Er is iets fout gegaan!</Text>
                ) : (
                    data.content[0].vacations.map((vacation) => (
                        <HolidayCard
                            vacation={vacation}
                            key={vacation.type}
                            handleNavigate={() => router.push(`/vacation-details/${vacation.type}`)}
                        />
                    ))
                )}
            </View>
        </View>
    );
};

export default Holidays;