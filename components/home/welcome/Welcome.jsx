import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './welcome.style';
import { icons, SIZES } from '../../../constants';

const vacationTypes = ["Herfstvakantie", "Kerstvakantie", "Voorjaarsvakantie", "Meivakantie", "Zomervakantie"];

const Welcome = () => {
    const router = useRouter();
    const [activeVacationType, setActiveVacationType] = useState("Herfstvakantie");

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.userName}>Hallo Student</Text>
                <Text style={styles.welcomeMessage}>Schoolvakanties</Text>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value=""
                        onChange={() => {}}
                        placeholder="Zoeken. . ."
                    />
                </View>

                <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
                    <Image
                        source={icons.search}
                        resizeMode="contain"
                        style={styles.searchBtnImage}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.tabsContainer}>
                <FlatList
                    data={vacationTypes}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={styles.tab(activeVacationType, item)}
                            onPress={() => {
                                setActiveVacationType(item);
                                router.push(`/search/${item}`)
                            }}
                        >
                            <Text style={styles.tabText(activeVacationType, item)}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item}
                    contentContainerStyle={{columnGap: SIZES.small}}
                    horizontal
                />
            </View>
        </View>
    );
};

export default Welcome;
