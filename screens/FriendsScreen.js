import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FriendsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Welcome to the Friends Screen!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightcoral',
    },
});

export default FriendsScreen;
