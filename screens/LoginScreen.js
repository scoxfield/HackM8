// Import necessary components
import React, { useState, useContext } from 'react';
import {View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
} from 'firebase/auth';
import { GlobalContext } from '../GlobalContext'; // Adjust the path accordingly
import { app, auth } from '../firebaseConfig';
import {CommonActions} from "@react-navigation/native";


const LoginScreen = ({ navigation }) => {
    const { setIsLoggedIn } = useContext(GlobalContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Sign in successful');
                console.log('User data:', userCredential.user);
                setIsLoggedIn(true); // Set the isLoggedIn state to true on successful sign-in
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    })
                );
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
            });
    };
    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Sign up successful');
                // Check if the user object and sendEmailVerification function are available
                sendEmailVerification(user);
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

/*    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Sign in successful');
                console.log('User data:', userCredential.user);
                setIsLoggedIn(true); //
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    })
                );
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
            });
    };*/

    // btn signIn
    const SignInButton = ({ action }) => {
        return (
            <TouchableOpacity style={styles.buttonSignIn} onPress={action}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        );
    };

    // btn signUp
    const SignUpButton = ({ action }) => {
        return (
            <TouchableOpacity style={styles.buttonSignUp} onPress={action}>
                <Text style={styles.buttonText}>Create account</Text>
            </TouchableOpacity>
        );
    };

    // btn forgot password
    const ForgotPasswordButton = ({ action }) => {
        return (
            <TouchableOpacity style={styles.buttonForgot} onPress={action}>
                <Text style={styles.buttonText}>Forgot Password</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.error}>{error}</Text>
            <KeyboardAvoidingView behavior={'padding'}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    secureTextEntry={true}
                />
            </KeyboardAvoidingView>
            <SignInButton action={handleSignIn} />
            <SignUpButton action={handleSignUp} />
            <ForgotPasswordButton action={handleForgotPassword} />
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

    // buttons
    buttonSignIn: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    buttonSignUp: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    buttonForgot: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default LoginScreen;
