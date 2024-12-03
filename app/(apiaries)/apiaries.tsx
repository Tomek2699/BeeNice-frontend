import { View, Text, TouchableOpacity, Alert, Image, Animated, LayoutAnimation } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddApiaryModal from '../../ScreensComponents/Apiaries/AddApiaryModal'
import EditApiaryModal from '@/ScreensComponents/Apiaries/EditApiaryModal';
import ApiaryRenderItem from '../../ScreensComponents/Apiaries/ApiaryRenderItem'
import Icons from '@/constants/Icons';
import LoadingScreen from '@/Components/LoadingScreen';
import CustomPageHeader from '../../Components/CustomPageHeader'
import { useApiaries } from '@/hooks/Apiaries/useApiaries';
import { useSearch } from '@/hooks/Apiaries/useSearch';
import { useCrud } from '@/hooks/Apiaries/useCrud';
import { useScreenActions } from '@/hooks/Apiaries/useScreenActions';
import { useRouting } from '@/hooks/Apiaries/useRouting';

const Apiaries = () => {
  const { apiaries, filteredApiaries, setApiaries, setFilteredApiaries, isLoading } = useApiaries();
  const { handleSearch } = useSearch({apiaries, setFilteredApiaries});
  const { handleAddApiary, handleEditApiary, handleDelete } = useCrud({setApiaries});
  const { expandedApiary, selectedApiary, addApiaryModalVisible, editApiaryModalVisible, setExpandedApiary, openAddModal, closeAddApairyModal, 
    openEditModal, closeEditApairyModal } = useScreenActions({apiaries})
  const { handleOpenHives } = useRouting();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView className="bg-primaryBg h-full">
      <CustomPageHeader
              title="Pasieki"
              pageIcon={Icons.apiaryColor}
              visibleBack={false}
              onSearch={handleSearch}
      />
      <View className="self-center mb-4">
        <TouchableOpacity
          className="self-center bg-mainButtonBg border-2 rounded-2xl p-4"
          onPress={openAddModal}
        >
          <Text className="font-pbold">Dodaj pasiekę</Text>
        </TouchableOpacity>
      </View>
      <Animated.FlatList
        data={filteredApiaries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ApiaryRenderItem
            item={item}
            expandedApiary={expandedApiary}
            setExpandedApiary={setExpandedApiary}
            handleOnPressEditApiary={openEditModal}
            handleDelete={handleDelete}
            handleOpenHives={() => handleOpenHives(item.id)}
          />
        )}
        contentContainerStyle={{ padding: 10 }}
      />
      <AddApiaryModal
        visible={addApiaryModalVisible}
        onClose={closeAddApairyModal}
        onSave={handleAddApiary}
      />
      <EditApiaryModal
        visible={editApiaryModalVisible}
        value={selectedApiary}
        onClose={closeEditApairyModal}
        onSave={handleEditApiary}
      />
    </SafeAreaView>
  );
};

export default Apiaries;