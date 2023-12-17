import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, database } from '../firebaseConfig';
import {getDatabase, onValue, ref, set, remove,get} from "@firebase/database";

const TeamScreen = ({ navigation }) => {
    const [teams, setTeams] = useState([]);
    const user = auth.currentUser;
    const db = getDatabase();
    useEffect(() => {
        // Fetch available teams from the database
        const teamsRef = ref(db,'Teams');
        onValue(teamsRef,(snapshot) => {
            if (snapshot.exists()) {
                const teamsData = snapshot.val();
                setTeams(Object.values(teamsData));
            }
        });
    }, []);

    const joinTeam = async (teamId) => {
        // Check if the user is already a member of any team
        const teamsRef = ref(db, 'Teams');
        const snapshot = await get(teamsRef);
        if (snapshot.exists()) {
            console.log(snapshot);
            const teamsData = snapshot.val();
            for (let team in teamsData) {
                console.log(teamsData[team].members[user.uid]==user.email);
                if (teamsData[team].members[user.uid]==user.email) {
                    alert('You are already a member of a team.');
                    return;
                }
            }
        }

        // Add the user to the selected team
        const teamRef = ref(db, `Teams/${teamId}/members/${user.uid}`);
        set(teamRef, user.email)
            .then(() => {
                // Handle successful join
                console.log('Joined team successfully!');
                // You might want to update the UI or show a message indicating success
            })
            .catch((error) => {
                // Handle errors
                console.error('Error joining team:', error);
            });
    };

    const leaveTeam = async (teamId) => {
        // Remove the user from the current team
        const teamRef = ref(db, `Teams/${teamId}/members/${user.uid}`);
        set(teamRef,false)
            .then(() => {
                // Handle successful leave
                console.log('Left team successfully!');
                // You might want to update the UI or show a message indicating success
            })
            .catch((error) => {
                // Handle errors
                console.error('Error leaving team:', error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Available Teams</Text>
            {teams.map((team, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.teamItem}
                    onPress={() => joinTeam(`Team${index + 1}`)}
                >
                    <Text>{team.name}</Text>
                    {/* Other team information display */}
                    {team.members && team.members[user.uid] && <Text>You are a member of this team.</Text>}
                </TouchableOpacity>
            ))}
            {teams.map((team, index) => (
                team.members && team.members[user.uid] && (
                    <TouchableOpacity
                        style={styles.leaveButton}
                        onPress={() => leaveTeam(`Team${index + 1}`)}
                    >
                        <Text>Leave {`Team${index + 1}`}</Text>
                    </TouchableOpacity>
                )
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    teamItem: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: 'lightgray',
        borderRadius: 5,
    },
    leaveButton: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    // Other styles as needed
});

export default TeamScreen;