import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from 'firebase/app';
import {auth, database} from '../firebaseConfig';
import {getDatabase, ref, onValue} from '@firebase/database';

const HackatonsScreen = () => {
    const [hackathons, setHackathons] = useState([]);
    const database = getDatabase();
    const hackathonsRef = ref(database, 'hackathons/')
    console.log("database is:" + database);
    useEffect(() => {
        fetch('https://hackmate-1e8a7-default-rtdb.europe-west1.firebasedatabase.app/hackathons.json')
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    const hackathonList = Object.keys(data).map((key) => data[key]);
                    setHackathons(hackathonList);
                }
            })
            .catch((error) => {
                console.error('Error fetching hackathons:', error);
            });
    }, []);
    console.log(hackathons);
    return (
        <View style={styles.container}>
            <Text>Welcome to the Hackathons Screen!</Text>
            {hackathons.map((hackathon, index) => (
                <View key={index}>
                    <Text>Name: {hackathon.name}</Text>
                    <Text>Date: {hackathon.date}</Text>
                    <Text>Duration: {hackathon.duration}</Text>
                    {/* Display other hackathon details */}
                </View>
            ))}
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