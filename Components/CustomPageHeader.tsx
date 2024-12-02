import React from 'react';
import { View, Text, TouchableOpacity, ImageSourcePropType, Image } from 'react-native';
import Icons from '../constants/Icons';
import { router } from 'expo-router';

interface Props {
    pageIcon: ImageSourcePropType;
    title: string;
    visibleSettings?: boolean;
    visibleBack?: boolean;
  }

export default function CustomPageHeader ({ title, pageIcon, visibleSettings = true, visibleBack = true } : Props)  {
  return (
    <View className='flex-row justify-between pt-2 px-2 mb-2'>
      <View className='flex-1 items-start'>
        {visibleBack && (
          <TouchableOpacity onPress={router.canGoBack() ? router.back : undefined}>
            <Image source={Icons.leftArrow} 
              resizeMode="contain"
              className="w-[70px] h-[60px]"/>
          </TouchableOpacity>
        )}
      </View>

      <View className='flex-2 justify-center items-center'>
        <Image source={pageIcon} 
            resizeMode="contain"
            className="w-[170px] h-[70px] mb-3"/>
        <Text className="text-4xl text-black font-pextrabold p-1 mb-2">{title}</Text>
      </View>

      <View className='flex-1 items-end pt-2'>
        {visibleSettings && (
          <TouchableOpacity onPress={() => router.push('/settings')}>
            <Image source={Icons.settings} 
              resizeMode="contain"
              className="w-[100px] h-[40px]"/>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};