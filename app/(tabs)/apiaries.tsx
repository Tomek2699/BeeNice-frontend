import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import ApiaryService from '../../services/ApiaryService'
import { Apiary } from '../../DataModels/ApiaryModel';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from '../../constants/Icons'
import Images from '../../constants/Images'
import AddApiaryModal from '../../ScreensComponents/Apiaries/AddApiaryModal'
import EditApiaryModal from '@/ScreensComponents/Apiaries/EditApiaryModal';

const Apiaries = () => {
  const [apiaries, setApiaries] = useState<Apiary[]>([]);
  const [expandedApiary, setExpandedApiary] = useState(apiaries.length > 0 ? apiaries[0].id : null);
  const [addApiaryModalVisible, setNewApiaryModalVisible] = useState(false);
  const [editApiaryModalVisible, setEditApiaryModalVisible] = useState(false);
  const [selectedApiary, setSelectedApiary] = useState<Apiary | null>(null);

  const handleAddApiary = (apiary: Apiary) => {
    setApiaries((prevApiaries) => [...prevApiaries, apiary]);
  };

  const handleEditApiary = (apiary: Apiary) => {
    setApiaries((prevApiaries) => 
      prevApiaries.map(item => item.id === apiary.id ? apiary : item)
    );
  };

  const handleOnPressEditApiary = (apiary: Apiary) => {
    setSelectedApiary(apiary)
    setEditApiaryModalVisible(true)
  };

  const handleDelete = async (id: number) => {
    Alert.alert(
      'Usuń element',
      'Czy na pewno chcesz usunąć ten element?',
      [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Usuń',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await ApiaryService.delete(id);
              if (response.status === 200) {
                setApiaries((apiaries) => apiaries.filter((item) => item.id !== id));
              } else {
                Alert.alert('Błąd', 'Nie udało się usunąć elementu. Spróbuj ponownie.');
              }
            } catch (error) {
              console.error('Błąd usuwania elementu:', error);
              Alert.alert('Błąd', 'Nie udało się usunąć elementu.');
            }
          },
        },
      ],
    );
  }

  const getData = async (): Promise<void> => {
    try {
      const response = await ApiaryService.getItems();
      if(response.status === 200){
        const downloadedApiaries = response.apiaries;
        setApiaries(downloadedApiaries);
      }
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się pobrać danych.');
    }
  };

  useEffect(() => {
    getData();
  }, []); 

  return (
    <SafeAreaView className="bg-primaryBg h-full">
      <View className='items-center pt-2 mb-4'>
          <Image source={Images.logoWithoutText}
              resizeMode='contain'
              className='w-[170px] h-[50px] mb-3'/>
          <Text className='text-4xl text-black font-pextrabold p-1 mb-2'>
            Pasieki
          </Text>
          <TouchableOpacity className='self-center bg-mainButtonBg border-2 rounded-2xl p-4' onPress={() => setNewApiaryModalVisible(true)}>
            <Text className='font-pbold'>Dodaj pasiekę</Text>
          </TouchableOpacity>
      </View>
      <ScrollView>
        <View className="w-full p-10">
          {apiaries.map((apiary) => (
            <TouchableOpacity
              key={apiary.id}
              className={`border-2 rounded-2xl p-4 bg-tile ${expandedApiary === apiary.id ? 'h-auto' : 'h-20'} mb-4`}
              onPress={() => setExpandedApiary(expandedApiary === apiary.id ? null : apiary.id)}
            >
              {expandedApiary === apiary.id ? (
                <View>
                  <Text className="font-pbold font-bold text-2xl mb-1" numberOfLines={1}>{apiary.name}</Text>
                  <View className='flex-row justify-between'>
                    <Text className="font-pmedium font-bold text-xl" numberOfLines={1}>{apiary.location}</Text>
                    <Text className="font-pmedium font-bold text-xl" numberOfLines={1}>{apiary.creationDate.toLocaleDateString('pl-PL')}</Text>
                  </View>

                  <View className='self-center h-[1] w-[80%] my-4 bg-black'></View>

                  <View className="flex-row justify-between">
                    <TouchableOpacity className="flex-row justify-center bg-edit w-[48%] rounded-xl p-3" onPress={() => handleOnPressEditApiary(apiary)}>
                      <Text className='font-pmedium text-xm mr-3'>Edytuj</Text>
                      <Image source={Icons.edit} className="w-6 h-6" resizeMode="contain"/>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row justify-center bg-remove w-[48%] rounded-xl p-3" onPress={() => handleDelete(apiary.id)}>
                      <Text className='font-pmedium text-xm mr-3'>Usuń</Text>
                      <Image source={Icons.remove} className="w-6 h-6" resizeMode="contain"/>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View className='flex-row justify-between items-center'>
                  <Text className="font-psemibold text-xl" numberOfLines={1}>{apiary.name}</Text>
                  <View className='flex-row'>
                    <TouchableOpacity className="bg-edit rounded-xl p-3 mr-2" onPress={() => handleOnPressEditApiary(apiary)}>
                      <Image source={Icons.edit} className="w-6 h-6" resizeMode="contain" />
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-remove rounded-xl p-3" onPress={() => handleDelete(apiary.id)}>
                      <Image source={Icons.remove} className="w-6 h-6" resizeMode="contain" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}

        </View>
      </ScrollView>

      <AddApiaryModal
        visible={addApiaryModalVisible}
        onClose={() => setNewApiaryModalVisible(false)}
        onSave={handleAddApiary}
      />

      <EditApiaryModal
        visible={editApiaryModalVisible}
        value={selectedApiary}
        onClose={() => setEditApiaryModalVisible(false)}
        onSave={handleEditApiary}
      />

    </SafeAreaView>
  );
};

export default Apiaries;