import React, { Profiler } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Home from "../screens/Home";
import NuevoPost from "../screens/NuevoPost";
import NavegacionComentar from "./NavegacionComentar"
import Profile from "../screens/Profile"


const Tab = createBottomTabNavigator();

function Menu(params) {
    return (

        <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
            <Tab.Screen name="Home" component={Home} options={
                { tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }
            } />
            <Tab.Screen name="NuevoPost" component={NuevoPost} options={
                { tabBarIcon: () => <AntDesign name="plus" size={24} color="black" /> }} />

            <Tab.Screen name="Profile" component={Profile} options={
                { tabBarIcon: () => <AntDesign name="user" size={24} color="black" /> }} />

            <Tab.Screen name="NavegacionComentar" component={NavegacionComentar} options={
                { tabBarIcon: () => <AntDesign name="plus" size={24} color="black" /> }} />
        </Tab.Navigator>

    )
}

export default Menu;
