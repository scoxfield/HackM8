import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions } from 'react-native';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from 'firebase/auth';
import { GlobalContext } from '../GlobalContext'; // Adjust the path accordingly
import { CommonActions } from '@react-navigation/native';

const auth = getAuth();

const LoginScreen = ({ navigation }) => {
    const { setIsLoggedIn } = useContext(GlobalContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Sign up successful');
                // Check if the user object and sendEmailVerification function are available
                if (user && user.sendEmailVerification) {
                    sendEmailVerification(user);
                } else {
                    console.log('Error: User or sendEmailVerification function is undefined.');
                }
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
            });
    };

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Sign in successful');
                console.log('User data:', userCredential.user);
                setIsLoggedIn(true); // Set the isLoggedIn state to true on successful sign-in
                navigation.navigate('Home');
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
            });
    };

    const handleForgotPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('Password reset email sent');
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
            });
    };

    const sendEmailVerification = (user) => {
        user.sendEmailVerification()
            .then(() => {
                console.log('Email verification sent');
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.error}>{error}</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign Up" onPress={handleSignUp} />
            <Button title="Sign In" onPress={handleSignIn} />
            <Button title="Forgot Password" onPress={handleForgotPassword} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        margin: 10,
        width: Dimensions.get('window').width * 0.8,
        borderRadius: 5,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default LoginScreen;
