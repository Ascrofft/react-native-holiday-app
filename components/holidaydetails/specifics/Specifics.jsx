import React from 'react';
import { View, Text } from 'react-native';

import styles from './specifics.style';

const Specifics = ({ title, points }) => {
    // console.log("POINTS : ", points);

    let startdate = new Date(points.startdate);
    let enddate = new Date(points.enddate);
    let currentdate = new Date();
    
    // console.log("CURRENT DATE : ", currentdate);
    // console.log("START DATE : ", startdate);

    let DIT = startdate - currentdate;

    // console.log("DIFFERENCE : ", DIT);

    let DIY = Math.round(DIT / (1000 * 3600 * 24));
    let daysLeft = `Nog ${DIY} dagen te gaan!`;

    if(DIY >= startdate && DIY <= enddate) {
        daysLeft = `Het is vakantie!`;
    }
    if(DIY >= enddate) {
        daysLeft = `De vakantie is voorbij!`;
    }
    
    // console.log("DAYS LEFT : ", DIY);

    startdate = `${startdate.getDate()}-${startdate.getMonth() +1}-${startdate.getFullYear()}`;
    enddate = `${enddate.getDate()}-${enddate.getMonth() + 1}-${enddate.getFullYear()}`;
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}:</Text>
            <Text style={styles.daysLeft}>{daysLeft}</Text>

            <View style={styles.pointsContainer}>
                <View style={styles.pointWrapper}>
                    <Text style={styles.pointDot} />
                    <Text style={styles.pointText}>Ingangsdatum: {startdate}</Text>
                </View>
                <View style={styles.pointWrapper}>
                    <Text style={styles.pointDot} />
                    <Text style={styles.pointText}>Einddatum: {enddate}</Text>
                </View>
            </View>
        </View>
    );
};

export default Specifics;