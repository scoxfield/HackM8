import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { auth, database, storage } from '../firebaseConfig';
import { ref, get } from '@firebase/database';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';

export default function FriendsScreen() {
    const [friends, setFriends] = useState([]);
    const userId = auth.currentUser.uid;

    useEffect(() => {
        const userFriendsRef = ref(database, `Users/${userId}/friends`);
        get(userFriendsRef).then(snapshot => {
            if (snapshot.exists()) {
                const friendsData = snapshot.val();
                const friendsPromises = Object.keys(friendsData).map(friendId => {
                    const friendRef = ref(database, `Users/${friendId}`);
                    return get(friendRef)
                        .then(friendSnapshot => {
                            const friendData = friendSnapshot.val();
                            const profilePicRef = storageRef(storage, friendData.profilePic);
                            return getDownloadURL(profilePicRef)
                                .then(profilePicURL => {
                                    return { id: friendId, email: friendData.email, profilePic: profilePicURL };
                                })
                                .catch(error => {
                                    console.log('Error fetching profile picture:', error);
                                    // Return the friendId, email, and a default profile picture URL if fetching the profile picture fails
                                    return { id: friendId, email: friendData.email, profilePic: 'defaultProfilePicURL' };
                                });
                        });
                });
                Promise.all(friendsPromises).then(friendsDetails => {
                    setFriends(friendsDetails);
                });
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={friends}
                keyExtractor={(item) => item.email}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.email}</Text>
                        <Image source={{ uri: item.profilePic }} style={{ width: 50, height: 50 }} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});