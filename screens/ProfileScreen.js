import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../firebaseConfig';
import { CommonActions } from '@react-navigation/native';

const WhiteLine = () => (
    <View style={styles.whiteLine}></View>
);

const ProfileScreen = ({ navigation }) => {
    const handleResetPassword = () => {
        const email = auth.currentUser.email;

        // Check if the user has provided an email
        if (email) {
            // Send a password reset email
            auth
                .sendPasswordResetEmail(email)
                .then(() => {
                    console.log('Password reset email sent');
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    };

    const handleLogOut = () => {
        auth.signOut().then(() => {
            // Navigating back to the login screen
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
            );
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.ContainerWrap}>
                <Text style={styles.headerText}>Profile Details</Text>

                <View style={styles.innerContainer}>
                    <Text style={styles.text}>Email: {auth.currentUser.email}</Text>
                </View>
                <WhiteLine />

                <View style={styles.SecondContainer}>
                    <Text style={styles.text}>Hackatons Attended : [0]</Text>
                </View>
                <WhiteLine />

                <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
                    <Text style={styles.resetButtonText}>Reset Password</Text>
                </TouchableOpacity>
                <WhiteLine />

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    ContainerWrap: {
       
        width: '80%',
        height: '50%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    innerContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    SecondContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    resetButton: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        margin: 10,
    },
    resetButtonText: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize:18,
    },
    logoutButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    logoutButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize:18,
    },
    whiteLine: {
        backgroundColor: 'white',
        height: 2,
        width: '100%',
        marginVertical: 10,
    },
});

export default ProfileScreen;
