import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue, set, get } from '@firebase/database';
import { LinearGradient } from 'expo-linear-gradient';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { auth } from '../firebaseConfig';

const WhiteLine = () => <View style={styles.whiteLine}></View>;

const HackatonsScreen = () => {
    const [hackathons, setHackathons] = useState([]);
    const database = getDatabase();
    const hackathonsRef = ref(database, 'hackathons/');
    const [userAttendance, setUserAttendance] = useState({});

    useEffect(() => {
        const db = getDatabase();
        const userAttendance = {};

        const checkUserAttendance = (hackathonId) => {
            const attendanceRef = ref(db, `hackathons/hackathon${hackathonId}/attendees/${auth.currentUser.uid}`);
            onValue(attendanceRef, (snapshot) => {
                if (snapshot.exists() && snapshot.val().attending === true) {
                    userAttendance[hackathonId] = {attending: true};
                } else {
                    userAttendance[hackathonId] = {attending: false};
                }
                setUserAttendance({...userAttendance});
            });
        };

        const fetchHackathons = async () => {
            const hackathonsRef = ref(db, 'hackathons');
            onValue(hackathonsRef, (snapshot) => {
                if (snapshot.exists()) {
                    const hackathonList = Object.keys(snapshot.val()).map((key) => snapshot.val()[key]);
                    setHackathons(hackathonList);
                    hackathonList.forEach(hackathon => checkUserAttendance(hackathon.id));
                }
            });
        };

        fetchHackathons();
    }, []);

    const screenWidth = Dimensions.get('window').width;

    // handleAttendance function
    const handleAttendance = async (hackathon) => {
        if (!hackathon || !hackathon.id) {
            console.error("Invalid hackathon object passed to handleAttendance");
            return;
        }

        const db = getDatabase();
        const attendanceRef = ref(db, `hackathons/hackathon${hackathon.id}/attendees/${auth.currentUser.uid}`);
        console.log(attendanceRef);
        try {
            const snapshot = await get(attendanceRef);
            if (snapshot.exists() && snapshot.val()==='true') {
                console.log("User is already attending this hackathon.");
            } else {
                await set(attendanceRef, { attending: true });
                console.log("User is now attending this hackathon.");
                setUserAttendance({ ...userAttendance, [hackathon.id]: { attending: true } });
            }
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

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
                            <TouchableOpacity onPress={() => hackathon && handleAttendance(hackathon)} disabled={userAttendance[hackathon?.id]?.attending}>
                                <View style={[styles.button, userAttendance[hackathon?.id]?.attending ? styles.attendingButton : {}]}>
                                    <Text style={styles.buttonText}>
                                        {userAttendance[hackathon?.id]?.attending ? "Attending" : "Attend!"}
                                    </Text>
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
    attendingButton: {
        backgroundColor: 'grey', // Change this to the color you want
    },
});

export default HackatonsScreen;
