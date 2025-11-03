import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

import home from "../screens/home";


const Tab = createBottomTabNavigator();

function menu(params) {
    return (

        <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
            <Tab.Screen name="home" component={home} options={
                { tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }
            } />
           
        </Tab.Navigator>

    )
}

export default menu;