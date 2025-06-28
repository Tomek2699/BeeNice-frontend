import { View, Text, TouchableOpacity, Animated, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddApiaryModal from '../../ScreensComponents/Apiaries/AddApiaryModal'
import EditApiaryModal from '@/ScreensComponents/Apiaries/EditApiaryModal';
import ApiaryRenderItem from '../../ScreensComponents/Apiaries/ApiaryRenderItem'
import Icons from '@/constants/Icons';
import LoadingScreen from '@/Components/LoadingScreen';
import CustomPageHeader from '../../Components/CustomPageHeader'
import { useData } from '@/hooks/ApiariesView/Apiaries/useData';
import { useSearch } from '@/hooks/ApiariesView/Apiaries/useSearch';
import { useCrud } from '@/hooks/ApiariesView/Apiaries/useCrud';
import { useScreenActions } from '@/hooks/ApiariesView/Apiaries/useScreenActions';
import { useRouting } from '@/hooks/ApiariesView/Apiaries/useRouting';
import ApiaryMapModal from '@/ScreensComponents/Apiaries/ApiaryMapModal';
import { Link, router } from 'expo-router';
import LinkButton from '@/Components/LinkButton';

const Apiaries = () => {
  const { apiaries, filteredApiaries, setApiaries, setFilteredApiaries, isLoading } = useData();
  const { handleSearch } = useSearch({apiaries, setFilteredApiaries});
  const { handleAddApiary, handleEditApiary, handleDeleteApiary } = useCrud({setApiaries});
  const { expandedApiary, selectedApiary, addApiaryModalVisible, editApiaryModalVisible, setExpandedApiary, openAddApiaryModal, closeAddApiaryModal, 
    openEditApiaryModal, closeEditApiaryModal } = useScreenActions({apiaries})
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
          className="flex-row justify-center self-center bg-mainButtonBg border-2 rounded-2xl p-4"
          onPress={openAddApiaryModal}
        >
          <Text className="font-pbold mr-3">Dodaj pasiekę</Text>
          <Image source={Icons.add} className="w-6 h-6" resizeMode="contain" />
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
            handleOnPressEditApiary={() => openEditApiaryModal(item)}
            handleDelete={handleDeleteApiary}
            handleOpenHives={() => handleOpenHives(item.id)}
          />
        )}
        contentContainerStyle={{ padding: 10 }}
      />
      <AddApiaryModal
        visible={addApiaryModalVisible}
        onClose={closeAddApiaryModal}
        onSave={handleAddApiary}
      />
      <EditApiaryModal
        visible={editApiaryModalVisible}
        value={selectedApiary}
        onClose={closeEditApiaryModal}
        onSave={handleEditApiary}
      />
    </SafeAreaView>
  );
};

export default Apiaries;