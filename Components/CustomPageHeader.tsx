import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageSourcePropType, Image, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icons from '../constants/Icons';
import { router } from 'expo-router';

interface Props {
    pageIcon: ImageSourcePropType;
    title: string;
    visibleSettings?: boolean;
    visibleBack?: boolean;
    onBack?: () => void;
    visibleSearch?: boolean;
    onSearch?: (query: string) => void;
  }

export default function CustomPageHeader ({ title, pageIcon, visibleSettings = true, visibleBack = true, onBack,
    visibleSearch = true, onSearch = () => {} } : Props) {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchPanel = () => {
    setSearchVisible((prev) => !prev);
  };

  const handleSearch = (text: string) => {
    setSearchValue(text);
    if (visibleSearch && onSearch) {
      onSearch(text);
    }
  };

  const handleGoBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className='flex flex-none mb-4 pt-2 px-8'>
        <View className='flex-row justify-between mb-2'>
          <View className='flex-1 items-start self-start'>
            {visibleBack && (
              <TouchableOpacity onPress={handleGoBack}>
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
          </View>

          <View className='flex-1 flex-row justify-end self-start'>
            {visibleSearch && (
              <TouchableOpacity onPress={handleSearchPanel}>
                <Image
                  source={Icons.search}
                  resizeMode="contain"
                  className="w-[30px] h-[30px] mr-4"
                  tintColor={'black'}
                />
             </TouchableOpacity>
            )}

            {visibleSettings && (
              <TouchableOpacity onPress={() => router.push('/settings')}>
                <Image source={Icons.settings} 
                  resizeMode="contain"
                  className="w-[30px] h-[30px]"/>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View className='justify-center items-center'>
          <Text className="text-4xl text-black font-pextrabold p-1 mb-2">{title}</Text>
        </View>

        {isSearchVisible && (
          <View className='w=full h-12 px-4 bg-fieldColor border-2 rounded-2xl items-center flex-row'>
            <TextInput
              className='flex-1 text-black font-psemibold text-base'
              placeholder='Wyszukaj'
              placeholderTextColor='black'
              numberOfLines={1}
              autoFocus={true}
              value={searchValue}
              onChangeText={handleSearch}
            />
            <TouchableOpacity onPress={() => handleSearch("")}>
                  <Image source={Icons.clear}
                      className='w-6 h-6'
                      resizeMode='contain'
                  />
              </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
    
  );
};