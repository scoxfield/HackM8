import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HackatonsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Welcome to the Hackatons Screen!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgreen',
    },
});

export default HackatonsScreen;
