import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icons from '../../constants/Icons'
import { UserServiceInstance } from "../../services/UserService";
import { router } from 'expo-router';

const Settings = () => {
  const handleLogout = () => {
    UserServiceInstance.logout();
    router.replace('/')
  };

  return (
    <SafeAreaView className='bg-primaryBg h-full'>
      <ScrollView>
      <View className='items-center pt-2'>
          <Image source={Icons.settings}
            resizeMode='contain'
            className='w-[170px] h-[50px]'/>
          <Text className='text-4xl text-black font-pextrabold p-2'>
            Opcje
          </Text>
        </View>

        <View className="flex-row justify-center p-10">
          <TouchableOpacity className="flex-row justify-center items-center bg-mainButtonBg rounded-xl p-3"
            onPress={handleLogout}>
            <Text className='font-pmedium text-3xl mr-3'>Wyloguj</Text>
            <Image source={Icons.logout} className="w-8 h-8" resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Settings