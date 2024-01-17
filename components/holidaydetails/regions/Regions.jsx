import React from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';

import styles from './regions.style';
import { SIZES } from '../../../constants';

const RegionButton = ({name, activeRegion, onHandleSearchType}) => (
    <TouchableOpacity
        style={styles.btn(name, activeRegion)}
        onPress={onHandleSearchType}
    >
        <Text style={styles.btnText(name, activeRegion)}>{name}</Text>
    </TouchableOpacity>
);

const Regions = ({regions, activeRegion, setActiveRegion}) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={regions}
                renderItem={({item}) => (
                    <RegionButton
                        name={item}
                        activeRegion={activeRegion}
                        onHandleSearchType={() => setActiveRegion(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item}
                contentContainerStyle={{columnGap: SIZES.small / 2}}
            />
        </View>
    );
};

export default Regions;
