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

    let difference = startdate - currentdate;

    // console.log("DIFFERENCE : ", difference);

    let days = Math.round(difference / (1000 * 3600 * 24));
    let daysLeft;

    // console.log("DAYS : ", days);
    // console.log("CURRENTDATE : ", currentdate);
    // console.log("STARTDATE : ", startdate);

    if(currentdate < startdate) {
        daysLeft = `Nog ${days} dagen te gaan!`;
    }
    if(currentdate >= startdate && currentdate <= enddate) {
        daysLeft = 'Het is vakantie!';
    }
    if(currentdate > enddate) {
        daysLeft = 'De vakantie is voorbij!';
    }

    startdate = `${startdate.getDate()}-${startdate.getMonth() +1}-${startdate.getFullYear()}`;
    enddate = `${enddate.getDate()}-${enddate.getMonth() + 1}-${enddate.getFullYear()}`;
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Regio: {title.charAt(0).toUpperCase() + title.slice(1)}</Text>
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
