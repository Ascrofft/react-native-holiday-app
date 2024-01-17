import { View, Text } from 'react-native';
import React from 'react';
import { Link, useRouter } from 'expo-router';

const Menu = () => {
    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
            <Link href="/Home">Home</Link>
            <Link href="/Settings">Settings</Link>
        </View>
    );
};

export default Menu;