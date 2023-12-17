import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';
import { auth, database } from '../firebaseConfig';
import { getDatabase, onValue, ref, set, remove, get } from "@firebase/database";
import { LinearGradient } from 'expo-linear-gradient';

const TeamScreen = ({ navigation }) => {
    const [teams, setTeams] = useState([]);
    const user = auth.currentUser;
    const db = getDatabase();

    useEffect(() => {
        const teamsRef = ref(db, 'Teams');
        onValue(teamsRef, (snapshot) => {
            if (snapshot.exists()) {
                const teamsData = snapshot.val();
                setTeams(Object.values(teamsData));
            }
        })

    }, []);

    const getTeamMembers = (team) => {
        let members = [];
        for (let member in team.members) {
            if (team.members[member] !== false) {
                members.push(team.members[member]);
            }
        }
        return members.join(', ');
    };

    const joinTeam = async (teamId) => {
        const teamsRef = ref(db, 'Teams');
        const snapshot = await get(teamsRef);
        if (snapshot.exists()) {
            const teamsData = snapshot.val();
            for (let team in teamsData) {
                if (teamsData[team].members[user.uid] === user.email) {
                    alert('You are already a member of a team.');
                    return;
                }
            }
        }

        const teamRef = ref(db, `Teams/${teamId}/members/${user.uid}`);
        set(teamRef, user.email)
            .then(() => {
                console.log('Joined team successfully!');
            })
            .catch((error) => {
                console.error('Error joining team:', error);
            });
    };

    const leaveTeam = async (teamId) => {
        const teamRef = ref(db, `Teams/${teamId}/members/${user.uid}`);
        set(teamRef, false)
            .then(() => {
                console.log('Left team successfully!');
            })
            .catch((error) => {
                console.error('Error leaving team:', error);
            });
    };
    return (
        <LinearGradient colors={['orange', 'red']} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.headerText}></Text>
                {teams.map((team, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.teamItem}
                        onPress={() => joinTeam(`Team${index + 1}`)}
                    >
                        <Text style={styles.teamName}>{team.name}</Text>
                        {team.logo && <Image source={{ uri: team.logo }} style={styles.teamLogo} />}
                        <Text style={styles.membersText}>Members: {getTeamMembers(team)}</Text>
                        {team.members && team.members[user.uid] && (
                            <Text style={styles.memberText}>You are a member of this team.</Text>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.leaveButtonContainer}>
                {teams.map(
                    (team, index) =>
                        team.members &&
                        team.members[user.uid] && (
                            <View key={`leave-container-${index}`} style={styles.leaveButtonContainer}>
                                <TouchableOpacity
                                    key={`leave-${index}`}
                                    style={styles.leaveButton}
                                    onPress={() => leaveTeam(`Team${index + 1}`)}
                                >
                                    <Text style={styles.leaveButtonText}>Leave {`Team${index + 1}`}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                )}
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    teamItem: {
        padding: 15,
        marginVertical: 10,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        overflow:'hidden',
    },
    teamName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black',
    },
    membersText: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
    },
    memberText: {
        color: 'green',
        fontStyle: 'italic',
    },
    teamLogo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginVertical: 10,
    },
    leaveButtonContainer: {
        alignItems: 'center',
        marginBottom: 20,
        height: 60,

    },
    leaveButton: {
        padding: 12,
        marginVertical: 8,
        borderRadius: 8,
        width: '80%',
        height: 60,
        alignItems: 'center',
        backgroundColor: 'red',
        elevation: 5,
        marginBottom: 20,
    },
    leaveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default TeamScreen;
