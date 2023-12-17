import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,  ActivityIndicator } from 'react-native';
import { auth } from '../firebaseConfig';
import { CommonActions } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/app';
import 'firebase/storage';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {sendPasswordResetEmail} from "firebase/auth";
import { LinearGradient } from 'expo-linear-gradient';
import {ImageBackground} from "react-native";


const WhiteLine = () => (
    <View style={styles.whiteLine}></View>
);

const ProfileScreen = ({ navigation }) => {
    const [profileImage, setProfileImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Load the stored image URI when the component mounts
    useEffect(() => {
        const loadProfileImage = async () => {
            try {
                const storage = getStorage();
                const storageRef = ref(storage, `ProfilePictures/${auth.currentUser.uid}`);
                const url = await getDownloadURL(storageRef);
                console.log("Download URL:", url);
                setProfileImage(url);
            } catch (error) {
                console.error('Error loading profile image:', error);
            }
        };

        loadProfileImage();
    }, [profileImage]);

    const handleResetPassword = () => {
        const email = auth.currentUser.email;
        // Check if the user has provided an email
        if (email) {
            // Send a password reset email
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert('Check your email!');
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

    const handleProfilePictureUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setProfileImage(result.uri);
            // Save the image URI locally
            await AsyncStorage.setItem('profileImage', result.uri);
            console.log("XDBUNA TU!");
            await uploadProfilePicture(result.uri);
            console.log("XBUNA TU!");
        }
    };

    const uploadProfilePicture = async (imageUri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', imageUri, true);
            xhr.send(null);
        });

        const storage = getStorage();
        const storageRef = ref(storage, `ProfilePictures/${auth.currentUser.uid}`);
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Handle progress, such as updating UI elements to show progress
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setUploading(true);
            },
            (error) => {
                // Handle unsuccessful uploads
                setUploading(false);
                console.error('Error uploading:', error);
                blob.close();
            },
            () => {
                // Handle successful uploads on completion
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    setUploading(false);
                    console.log('Download URL:', downloadURL);
                    setProfileImage(downloadURL);
                    blob.close();
                });
            }
        );
    };

    return (
        <LinearGradient
            colors={['orange', 'red']}
            style={styles.container}
        >
            <View style={styles.backgroundImageContainer}>
                <Image
                    source={require('../assets/blob1.png')}
                    style={styles.backgroundImage}
                />
            </View>
            <View style={styles.profilePictureContainer}>
                <View style={styles.profileImageContainer}>
                    {profileImage && <Image source={{ uri: profileImage }} style={styles.profileImage} />}
                </View>
                <TouchableOpacity style={styles.uploadImageButton} onPress={handleProfilePictureUpload}>
                    <Text style={styles.uploadImageButtonText}>Upload Profile Picture</Text>
                </TouchableOpacity>
            </View>
            <WhiteLine />

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
        </LinearGradient>
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
        height: '60%', // Adjust the height to accommodate the profile picture
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
        fontSize: 18,
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
        fontSize: 18,
    },
    whiteLine: {
        backgroundColor: 'white',
        height: 2,
        width: '100%',
        marginVertical: 10,
    },
    profilePictureContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
        top:100,
    },
    profileImageContainer: {
        borderColor: 'white',
        borderWidth: 4,
        borderRadius: 54,
        width: 108,
        height: 108,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
    },

    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    uploadImageButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    uploadImageButtonText: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    backgroundImageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

});

export default ProfileScreen;
