import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image, ImageSourcePropType } from 'react-native'
import { Redirect } from 'expo-router'
import Icons from '../../constants/Icons'
import Apiaries from './apiaries';
import Settings from './settings';

const Tabs = createBottomTabNavigator(); // Tworzymy instancję Tab Navigatora

interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({ icon, color, name, focused } : TabIconProps) => {
  return (
    <View className='items-center justify-center gap-1 mt-4 w-screen'>
      <Image
        source={icon}
        tintColor={color}
        resizeMode='contain'
        className='w-6 h-6'
      />
      <Text className='text-xs'>
          {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#B06A00',
        tabBarInactiveTintColor: '#000000',
        tabBarStyle: {
          backgroundColor: '#eec33d'
        }
      }}
    >
      <Tabs.Screen
        name="apiaries"
        component={Apiaries}
        options={{
          title: 'Pasieki',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              icon={Icons.home}
              color={color}
              focused={focused}
              name="Apiaries"
            />
          )
        }}
      />
      <Tabs.Screen
        name="settings"
        component={Settings}
        options={{
          title: 'Opcje',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              icon={Icons.settings}
              color={color}
              focused={focused}
              name="Settings"
            />
          )
        }}
      />
    </Tabs.Navigator>
  )
}

export default TabsLayout