import { View, Text, SafeAreaView, TouchableOpacity, Animated } from 'react-native'
import React from 'react'
import CustomPageHeader from '@/Components/CustomPageHeader'
import Icons from '@/constants/Icons'

const treatments = () => {
  return (
    <SafeAreaView className="bg-primaryBg h-full">
      <CustomPageHeader
              title="Zabiegi"
              pageIcon={Icons.treatment}
      />
      {/* <View className="items-center mb-4">
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
      /> */}
    </SafeAreaView>
  )
}

export default treatments