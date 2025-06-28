import React from 'react'
import Icons from '../../constants/Icons'
import CustomTabIcon from '@/Components/CustomTabIcon';
import { Tabs } from 'expo-router';

const TabsLayout = () => {
  return (
    <Tabs
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
        options={{
          title: 'Pasieki',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <CustomTabIcon
              icon={Icons.apiary}
              color={color}
              focused={focused}
              name="Pasieki"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="newApiary"
        options={{
          title: 'Nowa pasieka',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <CustomTabIcon
              icon={Icons.add}
              color={color}
              focused={focused}
              name="Dodaj"
            />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabsLayout