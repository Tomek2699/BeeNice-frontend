import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, Animated, LayoutAnimation } from 'react-native';
import { useRouter } from 'expo-router';
import ApiaryService from '../../services/ApiaryService'
import { Apiary } from '../../DataModels/ApiaryModel';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddApiaryModal from '../../ScreensComponents/Apiaries/AddApiaryModal'
import EditApiaryModal from '@/ScreensComponents/Apiaries/EditApiaryModal';
import ApiaryRenderItem from '../../ScreensComponents/Apiaries/ApiaryRenderItem'
import Icons from '@/constants/Icons';
import LoadingScreen from '@/Components/LoadingScreen';
import CustomPageHeader from '../../Components/CustomPageHeader'

const Apiaries = () => {
  const router = useRouter();
  const [apiaries, setApiaries] = useState<Apiary[]>([]);
  const [expandedApiary, setExpandedApiary] = useState(apiaries.length > 0 ? apiaries[0].id : null);
  const [addApiaryModalVisible, setNewApiaryModalVisible] = useState(false);
  const [editApiaryModalVisible, setEditApiaryModalVisible] = useState(false);
  const [selectedApiary, setSelectedApiary] = useState<Apiary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleOpenHives = (apairyId: number) => {
    router.push({
      pathname: '/hives',
      params: { apiaryId: apairyId.toString() },
    });
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
    finally{
      setIsLoading(false)
    }
  };

  const getDataWithDelay = async () => {
    setIsLoading(true)
    setTimeout(async () => {
      await getData();
    }, 5000); 
  };

  useEffect(() => {
    getDataWithDelay();
  }, []); 

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView className="bg-primaryBg h-full">
      <CustomPageHeader
              title="Pasieki"
              pageIcon={Icons.apiaryColor}
              visibleBack={false}
      />
      <View className="items-center mb-4">
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
            handleOpenHives={() => handleOpenHives(item.id)}
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