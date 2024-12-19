import React from 'react'
import Icons from '../../constants/Icons'
import CustomTabIcon from '@/Components/CustomTabIcon';
import { Tabs } from 'expo-router'
import { HoneyCollectionsProvider } from '@/DataProviders/HoneyCollectionsProvider';

const HarvestsLayout = () => {
  return (
    <HoneyCollectionsProvider>
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
          name="honeyCollection"
          options={{
            title: 'Zbiory',
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <CustomTabIcon
                icon={Icons.harvest}
                color={color}
                focused={focused}
                name="Zbiory"
              />
            )
          }}
        />
        <Tabs.Screen
          name="honeyCollectionStatistics"
          options={{
            title: 'Statystyki',
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <CustomTabIcon
                icon={Icons.barChart}
                color={color}
                focused={focused}
                name="Statystyki"
              />
            )
          }}
        />
      </Tabs>
    </HoneyCollectionsProvider>
  )
}

export default HarvestsLayout