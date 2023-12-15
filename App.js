// Import necessary components
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebaseConfig from './firebaseConfig';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import { GlobalProvider } from './GlobalContext';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <GlobalProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </GlobalProvider>
    );
};

export default App;
