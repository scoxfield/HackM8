// Import necessary components
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import { GlobalProvider } from './GlobalContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

const Stack = createNativeStackNavigator();

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            console.log('user', authUser);
            setUser(authUser);
        });

        // Cleanup function to unsubscribe from the auth state listener
        return () => unsubscribe();
    }, []);

    return (
        <GlobalProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    {!user ? (
                        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    ) : (
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{ headerShown: false }}
                            initialParams={{ user }}
                        />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </GlobalProvider>
    );
}
