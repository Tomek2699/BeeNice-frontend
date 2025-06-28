import "../global.css";
import { Image, ScrollView, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Images from '../constants/Images'
import CustomButton from "../Components/CustomButton";
import { router } from "expo-router";

export default function index() {
  return (
    <SafeAreaView className="bg-primaryBg h-full">
      
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className="w-full min-h-[85vh] justify-center items-center px-4">
          <Image source={Images.logo}
            resizeMode="contain"
            className="w-[140px] h-[140px] mb-20">
          </Image>

          <View className="relative mt-5">
            <Text className="text-3xl text-black text-center font-pbold">
              Zarządzaj pasieką w inteligentny i prosty sposób!
            </Text>
            <Text className="text-sm text-secondary text-center font-psemibold mt-5">
              Inteligentne zarządzanie pasieką: proste, efektywne i przyjazne dla pszczelarza.
            </Text>
          </View>
          <CustomButton
            title="Zaloguj"
            handlePress={() => router.push('/sign-in')}
            containerStyles='w-full mt-5'
          />
            <CustomButton
            title="Zarejestruj"
            handlePress={() => router.push('/sign-up')}
            containerStyles='w-full mt-5'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}