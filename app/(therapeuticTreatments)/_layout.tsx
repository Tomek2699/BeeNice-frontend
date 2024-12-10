import React from 'react'
import Icons from '../../constants/Icons'
import CustomTabIcon from '@/Components/CustomTabIcon';
import { Tabs } from 'expo-router'

const TreatmentsLayout = () => {
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
        name="therapeuticTreatment"
        options={{
          title: 'Zabiegi',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <CustomTabIcon
              icon={Icons.treatment}
              color={color}
              focused={focused}
              name="Zabiegi"
            />
          )
        }}
      />
    </Tabs>
  )
}

export default TreatmentsLayout