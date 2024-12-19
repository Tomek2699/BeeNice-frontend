import { View, Text, SafeAreaView, TouchableOpacity, Image, Animated } from 'react-native'
import React from 'react'
import CustomPageHeader from '@/Components/CustomPageHeader'
import Icons from '@/constants/Icons'
import LoadingScreen from '@/Components/LoadingScreen'
import { useLocalSearchParams } from 'expo-router'
import { useData } from '@/hooks/HoneyCollections/useData'
import { useSearch } from '@/hooks/HoneyCollections/useSearch'
import { useCrud } from '@/hooks/HoneyCollections/useCrud'
import { useScreenActions } from '@/hooks/HoneyCollections/useScreenActions'
import HoneyCollectionRenderItem from '@/ScreensComponents/HoneyCollections/HoneyCollectionRenderItem'
import AddHoneyCollectionModal from '@/ScreensComponents/HoneyCollections/AddHoneyCollectionModal'
import EditHoneyCollectionModal from '@/ScreensComponents/HoneyCollections/EditHoneyCollectionModal'
import { useHoneyCollections } from '@/DataProviders/HoneyCollectionsProvider'

const HoneyCollection = () => {
  const params = useLocalSearchParams();
  const { honeyCollections, setHoneyCollections } = useHoneyCollections();
  const { hiveId, filteredHoneyCollections, setFilteredHoneyCollections, isLoading } = useData({ params, setHoneyCollections });
  const { handleSearch } = useSearch({honeyCollections, setFilteredHoneyCollections});
  const { handleAddHoneyCollection, handleEditHoneyCollection, handleDeleteHoneyCollection } = useCrud({setHoneyCollections});
  const { expandedHoneyCollection, selectedHoneyCollection, addHoneyCollectionModalVisible, editHoneyCollectionModalVisible, setExpandedHoneyCollection, 
    openAddHoneyCollectionModal, closeAddHoneyCollectionModal, openEditHoneyCollectionModal, closeEditHoneyCollectionModal } = useScreenActions({honeyCollections})

  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <SafeAreaView className="bg-primaryBg h-full">
      <CustomPageHeader
              title="Zbiory"
              pageIcon={Icons.harvest}
              onSearch={handleSearch}
      />
      <View className="self-center mb-4">
        <TouchableOpacity
          className="flex-row justify-center self-center bg-mainButtonBg border-2 rounded-2xl p-4"
          onPress={openAddHoneyCollectionModal}
        >
          <Text className="font-pbold mr-3">Dodaj zbiór miodu</Text>
          <Image source={Icons.add} className="w-6 h-6" resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <Animated.FlatList
        data={filteredHoneyCollections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HoneyCollectionRenderItem
            item={item}
            expandedHoneyCollection={expandedHoneyCollection}
            setExpandedHoneyCollection={setExpandedHoneyCollection}
            handleOnPressEditHoneyCollection={openEditHoneyCollectionModal}
            handleDelete={handleDeleteHoneyCollection}
          />
        )}
        contentContainerStyle={{ padding: 10 }}
      />
      <AddHoneyCollectionModal
        visible={addHoneyCollectionModalVisible}
        hiveId={hiveId}
        onClose={closeAddHoneyCollectionModal}
        onSave={handleAddHoneyCollection}
      />
      <EditHoneyCollectionModal
        visible={editHoneyCollectionModalVisible}
        value={selectedHoneyCollection}
        onClose={closeEditHoneyCollectionModal}
        onSave={handleEditHoneyCollection}
      />
    </SafeAreaView>
  )
}

export default HoneyCollection