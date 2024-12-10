import { View, Text, SafeAreaView, TouchableOpacity, Animated, Image } from 'react-native'
import React from 'react'
import CustomPageHeader from '@/Components/CustomPageHeader'
import Icons from '@/constants/Icons'
import TherapeuticTreatmentRenderItem from '@/ScreensComponents/TherapeuticTreatments/TherapeuticTreatmentRenderItem'
import AddTherapeuticTreatmentModal from '@/ScreensComponents/TherapeuticTreatments/AddTherapeuticTreatmentModal'
import EditTherapeuticTreatmentModal from '@/ScreensComponents/TherapeuticTreatments/EditTherapeuticTreatmentModal'
import { useLocalSearchParams } from 'expo-router'
import { useData } from '@/hooks/TherapeuticTreatments/useData'
import { useSearch } from '@/hooks/TherapeuticTreatments/useSearch'
import { useCrud } from '@/hooks/TherapeuticTreatments/useCrud'
import { useScreenActions } from '@/hooks/TherapeuticTreatments/useScreenActions'
import LoadingScreen from '@/Components/LoadingScreen'

const Treatments = () => {
  const params = useLocalSearchParams();
  const { hiveId, therapeuticTreatments, filteredTherapeuticTreatments, setTherapeuticTreatments, setFilteredTherapeuticTreatments, isLoading } = useData({ params });
  const { handleSearch } = useSearch({therapeuticTreatments, setFilteredTherapeuticTreatments});
  const { handleAddTherapeuticTreatment, handleEditTherapeuticTreatment, handleDeleteTherapeuticTreatment } = useCrud({setTherapeuticTreatments});
  const { expandedTherapeuticTreatment, selectedTherapeuticTreatment, addTherapeuticTreatmentModalVisible, editTherapeuticTreatmentModalVisible, setExpandedTherapeuticTreatment, 
    openAddTherapeuticTreatmentModal, closeAddTherapeuticTreatmentModal, openEditTherapeuticTreatmentModal, 
    closeEditTherapeuticTreatmentModal } = useScreenActions({therapeuticTreatments})

  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <SafeAreaView className="bg-primaryBg h-full">
      <CustomPageHeader
              title="Zabiegi"
              pageIcon={Icons.treatment}
              onSearch={handleSearch}
      />
      <View className="self-center mb-4">
        <TouchableOpacity
          className="flex-row justify-center self-center bg-mainButtonBg border-2 rounded-2xl p-4"
          onPress={openAddTherapeuticTreatmentModal}
        >
          <Text className="font-pbold mr-3">Dodaj zabieg</Text>
          <Image source={Icons.add} className="w-6 h-6" resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <Animated.FlatList
        data={filteredTherapeuticTreatments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TherapeuticTreatmentRenderItem
            item={item}
            expandedTherapeuticTreatment={expandedTherapeuticTreatment}
            setExpandedTherapeuticTreatment={setExpandedTherapeuticTreatment}
            handleOnPressEditTherapeuticTreatment={openEditTherapeuticTreatmentModal}
            handleDelete={handleDeleteTherapeuticTreatment}
          />
        )}
        contentContainerStyle={{ padding: 10 }}
      />
      <AddTherapeuticTreatmentModal
        visible={addTherapeuticTreatmentModalVisible}
        hiveId={hiveId}
        onClose={closeAddTherapeuticTreatmentModal}
        onSave={handleAddTherapeuticTreatment}
      />
      <EditTherapeuticTreatmentModal
        visible={editTherapeuticTreatmentModalVisible}
        value={selectedTherapeuticTreatment}
        onClose={closeEditTherapeuticTreatmentModal}
        onSave={handleEditTherapeuticTreatment}
      />
    </SafeAreaView>
  )
}

export default Treatments