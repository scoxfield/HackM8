import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileScreen from './ProfileScreen';
import HackatonsScreen from './HackatonsScreen';
import FriendsScreen from './FriendsScreen';

const Tab = createBottomTabNavigator();

const HomeScreen = ({ route }) => {
    const user = route.params.user;

    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator>
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="person" color={color} size={size} />
                        ),
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name="Hackatons"
                    component={HackatonsScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="event" color={color} size={size} />
                        ),
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name="Friends"
                    component={FriendsScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="group" color={color} size={size} />
                        ),
                        headerShown: false,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default HomeScreen;
