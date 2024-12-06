import { View, Text, SafeAreaView, TouchableOpacity, Image, Animated } from 'react-native'
import React from 'react'
import CustomPageHeader from '@/Components/CustomPageHeader'
import Icons from '@/constants/Icons'
import { useLocalSearchParams } from 'expo-router'
import { useData } from '@/hooks/BeeFamilies/useData'
import { useSearch } from '@/hooks/BeeFamilies/useSearch'
import { useCrud } from '@/hooks/BeeFamilies/useCrud'
import { useScreenActions } from '@/hooks/BeeFamilies/useScreenActions'
import LoadingScreen from '@/Components/LoadingScreen'
import BeeFamilyRenderItem from '@/ScreensComponents/BeeFamilies/BeeFamilyRenderItem'
import AddBeeFamilyModal from '@/ScreensComponents/BeeFamilies/AddBeeFamilyModal'
import EditBeeFamilyModal from '@/ScreensComponents/BeeFamilies/EditBeeFamilyModal'

const BeeFamilies = () => {
  const params = useLocalSearchParams();
  const { hiveId, beeFamilies, filteredBeeFamilies, setBeeFamilies, setFilteredBeeFamilies, isLoading } = useData({ params });
  const { handleSearch } = useSearch({beeFamilies, setFilteredBeeFamilies});
  const { handleAddBeeFamily, handleEditBeeFamily, handleDeleteBeeFamily } = useCrud({setBeeFamilies});
  const { expandedBeeFamily, selectedBeeFamily, addBeeFamilyModalVisible, editBeeFamilyModalVisible, setExpandedBeeFamily, openAddBeeFamilyModal, closeAddBeeFamilyModal, 
    openEditBeeFamilyModal, closeEditBeeFamilyModal } = useScreenActions({beeFamilies})

  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <SafeAreaView className="bg-primaryBg h-full">
      <CustomPageHeader
              title="Rodziny"
              pageIcon={Icons.queen}
              onSearch={handleSearch}
      />
      <View className="self-center mb-4">
        <TouchableOpacity
          className="flex-row justify-center self-center bg-mainButtonBg border-2 rounded-2xl p-4"
          onPress={openAddBeeFamilyModal}
        >
          <Text className="font-pbold mr-3">Dodaj rodzinę</Text>
          <Image source={Icons.add} className="w-6 h-6" resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <Animated.FlatList
        data={filteredBeeFamilies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BeeFamilyRenderItem
            item={item}
            expandedBeeFamily={expandedBeeFamily}
            setExpandedBeeFamily={setExpandedBeeFamily}
            handleOnPressEditBeeFamily={openEditBeeFamilyModal}
            handleDelete={handleDeleteBeeFamily}
          />
        )}
        contentContainerStyle={{ padding: 10 }}
      />
      <AddBeeFamilyModal
        visible={addBeeFamilyModalVisible}
        hiveId={hiveId}
        onClose={closeAddBeeFamilyModal}
        onSave={handleAddBeeFamily}
      />
      <EditBeeFamilyModal
        visible={editBeeFamilyModalVisible}
        value={selectedBeeFamily}
        onClose={closeEditBeeFamilyModal}
        onSave={handleEditBeeFamily}
      />
    </SafeAreaView>
  )
}

export default BeeFamilies