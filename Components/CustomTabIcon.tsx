import { View, Text, Image, ImageSourcePropType } from 'react-native'
import React from 'react'

interface TabIconProps {
    icon: ImageSourcePropType;
    color: string;
    name: string;
    focused: boolean;
  }
  
  export default function CustomTabIcon  ({ icon, color, name, focused } : TabIconProps)  {
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
