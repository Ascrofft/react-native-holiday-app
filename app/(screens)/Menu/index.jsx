import { View, SafeAreaView, ScrollView } from 'react-native';
import { useRouter, Stack } from 'expo-router';

import { COLORS, icons, SIZES } from '../../../constants';
import { ScreenHeaderBtn, MenuItems } from '../../../components';

const Menu = () => {
    const router = useRouter();

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
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={ icons.back }
                            dimension="60%"
                            handlePress={(() => { router.back() })}
                        />
                    ),
                    headerTitle: ""
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