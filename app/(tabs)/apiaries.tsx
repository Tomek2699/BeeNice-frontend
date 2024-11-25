import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, Image, Animated, LayoutAnimation } from 'react-native';
import ApiaryService from '../../services/ApiaryService'
import { Apiary } from '../../DataModels/ApiaryModel';
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from '../../constants/Images'
import AddApiaryModal from '../../ScreensComponents/Apiaries/AddApiaryModal'
import EditApiaryModal from '@/ScreensComponents/Apiaries/EditApiaryModal';
import ApiaryRenderItem from '../../ScreensComponents/Apiaries/ApiaryRenderItem'

const Apiaries = () => {
  const [apiaries, setApiaries] = useState<Apiary[]>([]);
  const [expandedApiary, setExpandedApiary] = useState(apiaries.length > 0 ? apiaries[0].id : null);
  const [addApiaryModalVisible, setNewApiaryModalVisible] = useState(false);
  const [editApiaryModalVisible, setEditApiaryModalVisible] = useState(false);
  const [selectedApiary, setSelectedApiary] = useState<Apiary | null>(null);

  const handleAddApiary = (apiary: Apiary) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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
      <View className="items-center pt-2 mb-4">
        <Image
          source={Images.logoWithoutText}
          resizeMode="contain"
          className="w-[170px] h-[50px] mb-3"
        />
        <Text className="text-4xl text-black font-pextrabold p-1 mb-2">Pasieki</Text>
        <TouchableOpacity
          className="self-center bg-mainButtonBg border-2 rounded-2xl p-4"
          onPress={() => setNewApiaryModalVisible(true)}
        >
          <Text className="font-pbold">Dodaj pasiekę</Text>
        </TouchableOpacity>
      </View>
      <Animated.FlatList
        data={apiaries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ApiaryRenderItem
            item={item}
            expandedApiary={expandedApiary}
            setExpandedApiary={setExpandedApiary}
            handleOnPressEditApiary={handleOnPressEditApiary}
            handleDelete={handleDelete}
          />
        )}
        contentContainerStyle={{ padding: 10 }}
      />
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