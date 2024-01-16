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

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => setError(error), console.log(error))
            .finally(() => setIsLoading(false));
    }, []);

    console.log("DATA : ", data);

    // onLoad = async () => {
    //     try {
    //         await AsyncStorage.setItem('data', data.content[0]);
    //     } catch(err) {
    //         console.log("onLoad ERROR : ", err);
    //     }
    // };

    // useEffect(() => {
    //     onLoad();
    // }, []);

    // getData = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('data');

    //         console.log("VALUE : ", value);
    //         if(value !== null) {
    //             this.setState({ data: value })
    //         }
    //     } catch(err) {
    //         console.log("getData ERROR : ", err);
    //     }
    // }

    // useEffect(() => {
    //     this.getData();
    // }, []);



    // const { data, isLoading, error } = useFetch();

    // const { isPending, error, data } = useQuery({
    //     queryKey: ['data'],
    //     queryFn: () =>
    //         fetch(url).then((res) =>
    //         res.json(),
    //     ),
    // });

    // var storage = [];

    // localStorage.setItem("data", JSON.stringify(data));

    // useEffect(() => {
    //     const content = localStorage.getItem("data");
    //     console.log("DATA : ", JSON.parse(content));
    // }, []);

    // console.log("TITLE 2 : ", data.content[0].title.trim());

    return (
        <View style={styles.container}>
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
