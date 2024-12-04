import React from 'react'
import Icons from '../../constants/Icons'
import CustomTabIcon from '@/Components/CustomTabIcon';
import { Tabs } from 'expo-router'

const QueensLayout = () => {
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
        name="queens"
        options={{
          title: 'Matki',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <CustomTabIcon
              icon={Icons.hive}
              color={color}
              focused={focused}
              name="Matki"
            />
          )
        }}
      />
    </Tabs>
  )
}

export default QueensLayout