import React from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddHiveModal from '../../ScreensComponents/Hives/AddHiveModal'
import EditHiveModal from '@/ScreensComponents/Hives/EditHiveModal';
import HiveRenderItem from '../../ScreensComponents/Hives/HiveRenderItem'
import Icons from '@/constants/Icons';
import { useLocalSearchParams } from 'expo-router';
import LoadingScreen from '@/Components/LoadingScreen';
import CustomPageHeader from '@/Components/CustomPageHeader';
import { useData } from '@/hooks/Hives/useData';
import { useSearch } from '@/hooks/Hives/useSearch';
import { useCrud } from '@/hooks/Hives/useCrud';
import { useScreenActions } from '@/hooks/Hives/useScreenActions';
import { useRouting } from '@/hooks/Hives/useRouting';

const Hives = () => {
  const params = useLocalSearchParams();
  const { apiaryId, hives, filteredHives, setHives, setFilteredHives, isLoading } = useData({ params });
  const { handleSearch } = useSearch({hives, setFilteredHives});
  const { handleAddHive, handleEditHive, handleDeleteHive } = useCrud({setHives});
  const { expandedHive, selectedHive, addHiveModalVisible, editHiveModalVisible, setExpandedHive, openAddHiveModal, closeAddHiveModal, 
    openEditHiveModal, closeEditHiveModal } = useScreenActions({hives})
  const { handleOpenDashboard } = useRouting();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView className="bg-primaryBg h-full">
      <CustomPageHeader
              title="Ule"
              pageIcon={Icons.hiveColor}
              onSearch={handleSearch}
      />
      <View className="self-center mb-4">
        <TouchableOpacity
          className="flex-row justify-center self-center bg-mainButtonBg border-2 rounded-2xl p-4"
          onPress={openAddHiveModal}
        >
          <Text className="font-pbold mr-3">Dodaj ul</Text>
          <Image source={Icons.add} className="w-6 h-6" resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <Animated.FlatList
        data={filteredHives}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HiveRenderItem
            item={item}
            expandedHive={expandedHive}
            setExpandedHive={setExpandedHive}
            handleOnPressEditHive={openEditHiveModal}
            handleDelete={handleDeleteHive}
            handleOpenDashboard={handleOpenDashboard}
          />
        )}
        contentContainerStyle={{ padding: 10 }}
      />
      <AddHiveModal
        visible={addHiveModalVisible}
        apiaryId={apiaryId}
        onClose={closeAddHiveModal}
        onSave={handleAddHive}
      />
      <EditHiveModal
        visible={editHiveModalVisible}
        value={selectedHive}
        onClose={closeEditHiveModal}
        onSave={handleEditHive}
      />
    </SafeAreaView>
  );
};

export default Hives;