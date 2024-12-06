import { View, Text, SafeAreaView, TouchableOpacity, Animated, Image } from 'react-native'
import React from 'react'
import CustomPageHeader from '@/Components/CustomPageHeader'
import Icons from '@/constants/Icons'
import { useLocalSearchParams } from 'expo-router'
import LoadingScreen from '@/Components/LoadingScreen'
import QueenRenderItem from '@/ScreensComponents/Queens/QueenRenderItem'
import AddQueenModal from '@/ScreensComponents/Queens/AddQueenModal'
import EditQueenModal from '@/ScreensComponents/Queens/EditQueenModal'
import { useData } from '@/hooks/Queens/useData'
import { useSearch } from '@/hooks/Queens/useSearch'
import { useCrud } from '@/hooks/Queens/useCrud'
import { useScreenActions } from '@/hooks/Queens/useScreenActions'

const Queens = () => {
  const params = useLocalSearchParams();
  const { hiveId, queens, filteredQueens, setQueens, setFilteredQueens, isLoading } = useData({ params });
  const { handleSearch } = useSearch({queens, setFilteredQueens});
  const { handleAddQueen, handleEditQueen, handleDeleteQueen } = useCrud({setQueens});
  const { expandedQueen, selectedQueen, addQueenModalVisible, editQueenModalVisible, setExpandedQueen, openAddQueenModal, closeAddQueenModal, 
    openEditQueenModal, closeEditQueenModal } = useScreenActions({queens})

  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <SafeAreaView className="bg-primaryBg h-full">
      <CustomPageHeader
              title="Matki"
              pageIcon={Icons.queen}
              onSearch={handleSearch}
      />
      <View className="self-center mb-4">
        <TouchableOpacity
          className="flex-row justify-center self-center bg-mainButtonBg border-2 rounded-2xl p-4"
          onPress={openAddQueenModal}
        >
          <Text className="font-pbold mr-3">Dodaj matkę</Text>
          <Image source={Icons.add} className="w-6 h-6" resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <Animated.FlatList
        data={filteredQueens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <QueenRenderItem
            item={item}
            expandedQueen={expandedQueen}
            setExpandedQueen={setExpandedQueen}
            handleOnPressEditQueen={openEditQueenModal}
            handleDelete={handleDeleteQueen}
          />
        )}
        contentContainerStyle={{ padding: 10 }}
      />
      <AddQueenModal
        visible={addQueenModalVisible}
        hiveId={hiveId}
        onClose={closeAddQueenModal}
        onSave={handleAddQueen}
      />
      <EditQueenModal
        visible={editQueenModalVisible}
        value={selectedQueen}
        onClose={closeEditQueenModal}
        onSave={handleEditQueen}
      />
    </SafeAreaView>
  )
}

export default Queens