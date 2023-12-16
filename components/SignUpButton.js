// SignUpButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SignUpButton = ({ action }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={action}>
            <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3498db',
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

export default SignUpButton;
