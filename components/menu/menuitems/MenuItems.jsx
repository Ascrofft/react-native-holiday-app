import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter, Link } from 'expo-router';

import { icons } from '../../../constants';
import styles from './menuitems.style';

const MenuItems = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.itemsContainer}>

                {/* Home */}
                <TouchableOpacity style={styles.itemContainer} onPress={(() => { router.push('/Home') })}>
                    <TouchableOpacity style={styles.logoContainer}>
                        <Image
                            source={icons.home}
                            resizeMode="contain"
                            style={styles.logoImage}
                        />
                    </TouchableOpacity>

                    <View style={styles.textContainer}>
                        <Text style={styles.itemName} numberOfLines={1}>Home</Text>
                    </View>
                </TouchableOpacity>

                {/* Settings */}
                <TouchableOpacity style={styles.itemContainer} onPress={(() => { router.push('/Settings') })}>
                    <TouchableOpacity style={styles.logoContainer}>
                        <Image
                            source={icons.settings}
                            resizeMode="contain"
                            style={styles.logoImage}
                        />
                    </TouchableOpacity>

                    <View style={styles.textContainer}>
                        <Text style={styles.itemName} numberOfLines={1}>Settings</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MenuItems;
