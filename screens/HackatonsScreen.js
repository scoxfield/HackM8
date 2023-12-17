import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue } from '@firebase/database';
import { LinearGradient } from 'expo-linear-gradient';

const WhiteLine = () => <View style={styles.whiteLine}></View>;

const HackatonsScreen = () => {
    const [hackathons, setHackathons] = useState([]);
    const database = getDatabase();
    const hackathonsRef = ref(database, 'hackathons/');

    useEffect(() => {
        fetch(
            'https://hackmate-1e8a7-default-rtdb.europe-west1.firebasedatabase.app/hackathons.json'
        )
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

    const screenWidth = Dimensions.get('window').width;

    return (
        <LinearGradient colors={['orange', 'red']} style={styles.container}>
            <View>
                <Text style={styles.headerText}>Choose Hackatons!</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.hackathonsContainer}>
                    {hackathons.map((hackathon, index) => (
                        <View
                            key={index}
                            style={[
                                styles.hackathonEntry,
                                {
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: screenWidth > 600 ? '45%' : '90%',
                                },
                            ]}
                        >
                            <View style={{ marginRight: 10 }}>
                                <Text style={styles.hackathonName}>Name: {hackathon.name}</Text>
                                <Text style={styles.date}>Date: {hackathon.date}</Text>
                                <Text>Duration: {hackathon.duration}</Text>
                                <Text>Finishdate: {hackathon.finishdate}</Text>
                                <Text>Teamlimit: {hackathon.teamlimit}</Text>
                            </View>
                            <TouchableOpacity onPress={() => console.log('Button Pressed')}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Attend!</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                    <WhiteLine />
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
        marginTop: 40,
        padding: 5,
    },
    hackathonsContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    hackathonEntry: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 50,
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        padding: 20,
        marginBottom: 10,
    },
    hackathonName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
    },
    whiteLine: {
        backgroundColor: 'white',
        height: 2,
        width: '100%',
        marginVertical: 10,
    },
    date: {
        color: 'black',
    },
    button: {
        right:25,
        backgroundColor: 'orange',
        padding: 15,
        borderRadius: 20,
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default HackatonsScreen;
