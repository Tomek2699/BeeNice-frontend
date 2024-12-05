import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import CustomPageHeader from '@/Components/CustomPageHeader'
import Icons from '@/constants/Icons'
import { useLocalSearchParams } from 'expo-router';
import { useData } from '@/hooks/HiveDashboard/useData';
import { useRouting } from '@/hooks/HiveDashboard/useRouting';

export default function Dashboard () {
  const params = useLocalSearchParams();
  const { hive } = useData({ params });
  const { handleOpenQueens, handleOpenFamilies, handleOpenHarvests, handleOpenTreatments, } = useRouting({hive});

  return (
    <SafeAreaView className='bg-primaryBg h-full'>
      <ScrollView>
        <CustomPageHeader
                title={`Panel ula - ${hive?.hiveNumber}`}
                pageIcon={Icons.dashboard}
                visibleSearch={false}
        />
        <View className='flex-row flex-wrap justify-between p-4'>
          <TouchableOpacity
              onPress={handleOpenQueens}
              className="justify-center items-center bg-hiveBtn w-[49%] rounded-xl p-8 mb-4">
              <Image source={Icons.queen} className="w-[100px] h-[60px] mb-3" resizeMode="contain" />
              <Text className="font-pmedium text-2xl">Matki</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={handleOpenFamilies}
              className="justify-center items-center bg-hiveBtn w-[49%] rounded-xl p-8 mb-4">
              <Image source={Icons.family} className="w-[120px] h-[60px] mb-3" resizeMode="contain" />
              <Text className="font-pmedium text-2xl">Rodziny</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={handleOpenHarvests}
              className="justify-center items-center bg-hiveBtn w-[49%] rounded-xl p-8 mb-4">
              <Image source={Icons.harvest} className="w-[120px] h-[60px] mb-3" resizeMode="contain" />
              <Text className="font-pmedium text-2xl">Zbiory</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={handleOpenTreatments}
              className="justify-center items-center bg-hiveBtn w-[49%] rounded-xl p-8 mb-4">
              <Image source={Icons.treatment} className="w-[120px] h-[60px] mb-3" resizeMode="contain" />
              <Text className="font-pmedium text-2xl">Zabiegi</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

