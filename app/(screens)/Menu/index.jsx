import { View, SafeAreaView, ScrollView } from 'react-native';
import { Stack } from 'expo-router';

import { COLORS, SIZES } from '../../../constants';
import { MenuItems } from '../../../components';

const Menu = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.lightWhite
            }}
        >
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerTitle: ''
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium
                    }}
                >
                    <MenuItems />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Menu;