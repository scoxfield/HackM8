import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WhiteLine = () => (
    <View style={styles.whiteLine}></View>
);

const FriendsScreen = () => {
    return (
        <LinearGradient
            colors={['orange', 'red']}
            style={styles.container}
        >
            <Image
                source={require('../assets/blob1.png')}
                style={styles.backgroundImage}
            />
            <View style={styles.contentContainer}>
                <Text>Navem nmimic aici mos craiun si prienteni sai gg</Text>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent', // Set the background to transparent
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    whiteLine: {
        backgroundColor: 'white',
        height: 2,
        width: '100%',
        marginVertical: 10,
    },
});

export default FriendsScreen;
