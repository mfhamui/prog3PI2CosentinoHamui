import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

import Home from "../screens/Home/Home";
import Profile from "../screens/Profile/Profile";
import Usuarios from "../screens/Usuarios/Usuarios";
import Posts from "../screens/Posts";

const Tab = createBottomTabNavigator();

function menu(params) {
    return (

        <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
            <Tab.Screen name="Home" component={Home} options={
                { tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }
            } />
            <Tab.Screen name="Profile" component={Profile} options={
                { tabBarIcon: () => <AntDesign name="profile" size={24} color="black" /> }} />
            
            <Tab.Screen name="Posts" component={Posts} options={
                { tabBarIcon: () => <AntDesign name="plus" size={24} color="black" /> }} />

        </Tab.Navigator>

    )
}

export default menu;