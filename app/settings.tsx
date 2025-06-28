import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icons from '../constants/Icons'
import { UserServiceInstance } from "../services/UserService";
import { router } from 'expo-router';
import CustomPageHeader from '../Components/CustomPageHeader'

const Settings = () => {
  const handleLogout = () => {
    UserServiceInstance.logout();
    router.replace('/')
  };

  return (
    <SafeAreaView className='bg-primaryBg h-full'>
      <ScrollView>
        <CustomPageHeader
                title="Opcje"
                pageIcon={Icons.settings}
                visibleSettings={false}
                visibleSearch={false}
        />

        <View className="flex-1 justify-center p-10">
          <TouchableOpacity className="flex-row justify-center items-center bg-mainButtonBg rounded-xl p-3 mb-2"
            onPress={handleLogout}>
            <Text className='font-pmedium text-3xl mr-3'>Wyloguj</Text>
            <Image source={Icons.logout} className="w-8 h-8" resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-center items-center bg-mainButtonBg rounded-xl p-3">
            <Text className='font-pmedium text-3xl mr-3'>Zmiana hasła</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Settings