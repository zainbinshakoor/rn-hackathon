import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screens/auth/login/Login'
import Register from '../screens/auth/register/Register'
import Forgot from '../screens/auth/forgot.js/Forgot'
import Home from '../screens/home/Home';
import Profile from '../screens/profile/Profile';
import UpdateProfile from '../screens/profile/UpdateProfile';
import Detail from '../screens/home/Detail';
import Post from '../screens/post/Post';
import Icon from 'react-native-vector-icons/AntDesign';
import { useAuthContext } from '../contexts/AuthContext';
export default function AppNavigator() {
    const { authenticated } = useAuthContext();
    console.log(authenticated)
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    const ProfileStack = () => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
            </Stack.Navigator>
        )
    }
    const DetailItem = () => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Detail" component={Detail} />
            </Stack.Navigator>
        )
    }
    return (


        <NavigationContainer>
            {!authenticated ?
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name='Forgot' component={Forgot} />
                </Stack.Navigator>
                :
                <Tab.Navigator

                >
                    <Tab.Screen name="DetailItem" component={DetailItem}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'Home',
                            tabBarIcon: ({ color, size }) => (
                                <Icon name="home" color={color} size={size} />
                            ),
                        }}
                    />

                    <Tab.Screen name="Post" component={Post}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'Post',
                            tabBarIcon: ({ color, size }) => (
                                <Icon name="upload" color={color} size={size} />
                            ),
                        }}
                    />
                    <Tab.Screen name="profile" component={ProfileStack}
                        options={{
                            headerShown: false,
                            tabBarLabel: 'Profile',
                            tabBarIcon: ({ color, size }) => (
                                <Icon name="user" color={color} size={size} />
                            ),
                        }}
                    />

                </Tab.Navigator>
            }
        </NavigationContainer>
    )
}