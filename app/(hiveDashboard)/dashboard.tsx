import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomPageHeader from '@/Components/CustomPageHeader'
import Icons from '@/constants/Icons'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Hive } from '@/DataModels/HiveModel';

export default function dashboard () {
  const router = useRouter();
  const { hiveObject } = useLocalSearchParams();
  const [hive, setHive] = useState<Hive | undefined>();

  const handleOpenMothers = () => {
    router.push({
      pathname: '/mothers',
      params: { hiveId: hive?.id.toString() },
    });
  };

  const handleOpenFamilies = () => {
    router.push({
      pathname: '/families',
      params: { hiveId: hive?.id.toString() },
    });
  };

  const handleOpenHarvests = () => {
    router.push({
      pathname: '/harvests',
      params: { hiveId: hive?.id.toString() },
    });
  };

  const handleOpenTreatments = () => {
    router.push({
      pathname: '/treatments',
      params: { hiveId: hive?.id.toString() },
    });
  };

  useEffect(() => {
    if (typeof hiveObject === 'string') {
      const parsedHive = JSON.parse(hiveObject);
      setHive(parsedHive);
    }
  }, [hiveObject]);

  return (
    <SafeAreaView className='bg-primaryBg h-full'>
      <ScrollView>
        <CustomPageHeader
                title={`Panel ula - ${hive?.hiveNumber}`}
                pageIcon={Icons.dashboard}
        />

        <View className='flex-row flex-wrap justify-between p-4'>
          <TouchableOpacity
              onPress={handleOpenMothers}
              className="justify-center items-center bg-hiveBtn w-[49%] rounded-xl p-8 mb-4">
              <Image source={Icons.mother} className="w-[100px] h-[60px] mb-3" resizeMode="contain" />
              <Text className="font-pmedium text-2xl">Mataka</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={handleOpenFamilies}
              className="justify-center items-center bg-hiveBtn w-[49%] rounded-xl p-8 mb-4">
              <Image source={Icons.family} className="w-[120px] h-[60px] mb-3" resizeMode="contain" />
              <Text className="font-pmedium text-2xl">Rodzina</Text>
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

