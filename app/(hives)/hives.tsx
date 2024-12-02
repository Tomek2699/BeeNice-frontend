import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, Animated, LayoutAnimation, Button } from 'react-native';
import HiveService from '../../services/HiveService'
import { Hive } from '../../DataModels/HiveModel';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddHiveModal from '../../ScreensComponents/Hives/AddHiveModal'
import EditHiveModal from '@/ScreensComponents/Hives/EditHiveModal';
import HiveRenderItem from '../../ScreensComponents/Hives/HiveRenderItem'
import Icons from '@/constants/Icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import LoadingScreen from '@/Components/LoadingScreen';
import CustomPageHeader from '@/Components/CustomPageHeader';

const Hives = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [apiaryId, setApiaryId] = useState<number | undefined>();
  const [hives, setHives] = useState<Hive[]>([]);
  const [expandedHive, setExpandedHive] = useState(hives.length > 0 ? hives[0].id : null);
  const [addHiveModalVisible, setNewHiveModalVisible] = useState(false);
  const [editHiveModalVisible, setEditHiveModalVisible] = useState(false);
  const [selectedHive, setSelectedHive] = useState<Hive | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddHive = (hive: Hive) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setHives((prevHives) => [...prevHives, hive]);
  };

  const handleEditHive = (hive: Hive) => {
    setHives((prevHives) => 
      prevHives.map(item => item.id === hive.id ? hive : item)
    );
  };

  const handleOnPressEditHive = (hive: Hive) => {
    setSelectedHive(hive)
    setEditHiveModalVisible(true)
  };

  const handleOpenDashboard = (hive: Hive) => {
    const serializedData = JSON.stringify(hive);
    router.push({
      pathname: '/dashboard',
      params: { hiveObject: serializedData },
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
              const response = await HiveService.delete(id);
              if (response.status === 200) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setHives((hives) => hives.filter((item) => item.id !== id));
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
    setIsLoading(true);
    try {
      const response = await HiveService.getItems(apiaryId);
      if(response.status === 200){
        const downloadedHives = response.hives;
        setHives(downloadedHives);
      }
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się pobrać danych.');
    }
    finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof params.apiaryId === 'string') {
      setApiaryId(Number(params.apiaryId));
    }
  }, [params.apiaryId]);

  useEffect(() => {
    if (apiaryId !== undefined) {
      getData();
    }
  }, [apiaryId]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView className="bg-primaryBg h-full">
      <CustomPageHeader
              title="Ule"
              pageIcon={Icons.hiveColor}
      />
      <View className="items-center mb-4">
        <TouchableOpacity
          className="self-center bg-mainButtonBg border-2 rounded-2xl p-4"
          onPress={() => setNewHiveModalVisible(true)}
        >
          <Text className="font-pbold">Dodaj ul</Text>
        </TouchableOpacity>
      </View>
      <Animated.FlatList
        data={hives}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HiveRenderItem
            item={item}
            expandedHive={expandedHive}
            setExpandedHive={setExpandedHive}
            handleOnPressEditHive={handleOnPressEditHive}
            handleDelete={handleDelete}
            handleOpenDashboard={handleOpenDashboard}
          />
        )}
        contentContainerStyle={{ padding: 10 }}
      />
      <AddHiveModal
        visible={addHiveModalVisible}
        apiaryId={apiaryId}
        onClose={() => setNewHiveModalVisible(false)}
        onSave={handleAddHive}
      />
      <EditHiveModal
        visible={editHiveModalVisible}
        value={selectedHive}
        onClose={() => setEditHiveModalVisible(false)}
        onSave={handleEditHive}
      />
    </SafeAreaView>
  );
};

export default Hives;