import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

import styles from './Holidays.style';
import { COLORS, SIZES } from '../../../constants';
import HolidayCard from '../../common/cards/holidays/HolidayCard';
import useFetch from '../../../hook/useFetch';

const url = "https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/2023-2024?output=json";

const Holidays = () => {
    const router = useRouter();

    const { isPending, error, data } = useQuery({
        queryKey: ['data'],
        queryFn: () =>
            fetch(url).then((res) =>
            res.json(),
        ),
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {isPending ? (
                    <ActivityIndicator size="large" colors={COLORS.primary} />
                ) : error ? (
                    <Text>Er is iets fout gegaan. . .</Text>
                ) : (
                    <Text style={styles.headerTitle}>{data.content[0].schoolyear.trim()}</Text>
                )}
            </View>
            
            <View style={styles.cardsContainer}>
                {isPending ? (
                    <ActivityIndicator size="large" colors={COLORS.primary} />
                ) : error ? (
                    <Text>Er is iets fout gegaan. . .</Text>
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
