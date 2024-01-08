import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './vacation.style';
import { icons } from '../../../constants';

const Vacation = ({vacationLogo, vacationTitle}) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoBox}>
                <Image
                    source={vacationLogo}
                    style={styles.logoImage}
                />
            </View>

            <View style={styles.vacationTitleBox}>
                <Text style={styles.vacationTitle}>{vacationTitle}</Text>
            </View>
        </View>
    );
};

export default Vacation;