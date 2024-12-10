import React from 'react'
import Icons from '../../constants/Icons'
import CustomTabIcon from '@/Components/CustomTabIcon';
import { Tabs } from 'expo-router'

const ReviewsLayout = () => {
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
        name="review"
        options={{
          title: 'Przeglądy',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <CustomTabIcon
              icon={Icons.review}
              color={color}
              focused={focused}
              name="Przeglądy"
            />
          )
        }}
      />
    </Tabs>
  )
}

export default ReviewsLayout